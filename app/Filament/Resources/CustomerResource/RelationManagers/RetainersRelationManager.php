<?php

namespace App\Filament\Resources\CustomerResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;
use App\Models\Product;
use App\Models\Retainer;
use App\Models\Order;
use Closure;
use Filament\Forms\Get;
use Filament\Tables\Actions\Action;
use Illuminate\Support\Facades\DB;
use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Collection;

class RetainersRelationManager extends RelationManager
{
    protected static string $relationship = 'retainers';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('product_id')
                    ->relationship('product', 'name')
                    ->searchable()
                    ->preload()
                    ->required()
                    ->reactive(),
                TextInput::make('quantity')
                    ->numeric()
                    ->required()
                    ->minValue(1)
                    ->rule(function (Get $get) {
                        return function (string $attribute, $value, Closure $fail) use ($get) {
                            if (!$get('product_id')) {
                                return;
                            }
                            $product = Product::find($get('product_id'));
                            if ($product && $product->quantity < $value) {
                                $fail("The retained quantity cannot be more than the available stock ({$product->quantity}).");
                            }
                        };
                    }),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('id')
            ->columns([
                Tables\Columns\TextColumn::make('product.name'),
                Tables\Columns\TextColumn::make('quantity'),
                Tables\Columns\TextColumn::make('created_at')->dateTime(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->after(function(Retainer $record) {
                        $product = $record->product;
                        if ($product) {
                            $product->quantity -= $record->quantity;
                            $product->save();
                        }
                    }),
            ])
            ->actions([
                Action::make('release')
                    ->label('Release To Order')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->action(function (Retainer $record) {
                        DB::transaction(function () use ($record) {
                            $product = $record->product;
                            $customer = $record->customer;
                            $totalPayable = $product->price * $record->quantity;
                            
                            $discountPercentage = $customer->userSpecificDiscount->discount ?? 0;
                            $finalAmount = $totalPayable - ($totalPayable * $discountPercentage / 100);

                            $order = Order::create([
                                'customer_id' => $customer->id,
                                'total_payable' => $totalPayable,
                                'discount' => $discountPercentage,
                                'final_amount' => $finalAmount,
                                'created_by' => auth()->id(),
                            ]);

                            $order->products()->attach($product->id, ['quantity' => $record->quantity]);

                            $record->delete();
                        });
                        Notification::make()->title('Retainer released to order successfully.')->success()->send();
                    }),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->after(function (Retainer $record) {
                        $product = $record->product;
                        if ($product) {
                            $product->quantity += $record->quantity;
                            $product->save();
                        }
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->after(function (Collection $records) {
                            foreach ($records as $record) {
                                $product = $record->product;
                                if ($product) {
                                    $product->quantity += $record->quantity;
                                    $product->save();
                                }
                            }
                        }),
                ]),
            ]);
    }
}
