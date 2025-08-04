<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use App\Models\Product;
use App\Models\Scheme;
use App\Models\Customer;
use App\Models\Userspecificdiscounts; 
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Actions\BulkActionGroup;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\MultiSelect;
use Filament\Forms\Components\Repeater;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction; 
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Forms\Components\NumericInput;
use Filament\Forms\Components\BelongsToSelect;
use Filament\Forms\Components\Placeholder; 
use Filament\Forms\Components\Hidden;
use Illuminate\Support\Str;
use App\Filament\Resources\OrderResource\Widgets\OrderProducts;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';

   public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('customer_id')
                    ->label('Customer')
                    ->relationship('customer', 'name')
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set, callable $get) {
                        $customerDiscount = Userspecificdiscounts::where('customer_id', $state)->first();
                        $discount = $customerDiscount ? $customerDiscount->discount : 0;
                        $set('discount', $discount);
                        $totalPayable = (float) ($get('total_payable') ?? 0);
                        $finalAmount = $totalPayable - ($totalPayable * $discount / 100);
                        $set('final_amount', round($finalAmount, 2));
                    }),
                    
                TextInput::make('id')
                    ->label('Order ID')
                    ->disabled()
                    ->default(fn () => (string) Str::uuid())->hidden(),

                TextInput::make('total_payable')
                    ->label('Total Payable')
                    ->type('number')
                    ->step(0.01)
                    ->disabled()
                    ->dehydrated(),

                

                TextInput::make('discount')
                    ->label('Discount')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(100)
                    ->step(0.01)
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set, callable $get) {
                        $totalPayable = (float) ($get('total_payable') ?? 0);
                        $discount = (float) ($state ?? 0);
                        $finalAmount = $totalPayable - ($totalPayable * $discount / 100);
                        $set('final_amount', round($finalAmount, 2));
                    }),

                TextInput::make('final_amount')
                    ->label('Final Amount')
                    ->required()
                    ->type('number') 
                    ->step(0.01)
                    ->disabled()
                    ->dehydrated(),

                Hidden::make('created_by')
                    ->default(auth()->id()),

                Repeater::make('products')
                    ->label('Products')
                    ->schema([
                        Select::make('id')
                            ->label('Product')
                            ->options(Product::all()->pluck('name', 'id'))
                            ->searchable()
                            ->required()
                            ->reactive(),
                        TextInput::make('quantity')
                            ->label('Quantity')
                            ->type('number')
                            ->minValue(1)
                            ->required()
                            ->reactive(),
                    ])
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set, callable $get) {
                        $total = 0;
                        foreach ($state as $item) {
                            $product = Product::find($item['id'] ?? null);
                            $qty = (int) ($item['quantity'] ?? 0);
                            if ($product && $qty > 0) {
                                $total += $product->price * $qty;
                            }
                        }
                        $set('total_payable', $total);
                        
                        // Calculate final amount with discount
                        $discount = (float) ($get('discount') ?? 0);
                        $finalAmount = $total - ($total * $discount / 100);
                        $set('final_amount', round($finalAmount, 2));
                    }),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                
                TextColumn::make('customer.name')
                    ->label('Customer')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('products')
                    ->label('Products')
                    ->formatStateUsing(function ($state, $record) {
                        return $record->products->pluck('name')->join(', ');
                    })->toggleable(),
                TextColumn::make('total_payable')
                    ->label('Total Payable')
                    ->money('USD')
                    ->sortable(),
                TextColumn::make('discount')
                    ->label('Discount')
                    ->suffix('%')
                    ->sortable(),
                TextColumn::make('final_amount')
                    ->label('Final Amount')
                    ->money('USD') 
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                EditAction::make(),
                ViewAction::make(), 
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
{
    return [
        'index' => Pages\ListOrders::route('/'),
        'create' => Pages\CreateOrder::route('/create'),
        'view' => Pages\ViewOrder::route('/{record}'), // Add this line
        'edit' => Pages\EditOrder::route('/{record}/edit'),
    ];
}
}
                 