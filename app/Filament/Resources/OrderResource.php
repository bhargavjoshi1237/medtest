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
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Actions\BulkActionGroup;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction; 
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Forms\Components\NumericInput;
use Filament\Forms\Components\BelongsToSelect;
use Illuminate\Support\Str;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';

   public static function form(Form $form): Form
    {
        return $form
            ->schema([
                
                TextInput::make('id')
                    ->label('Order ID')
                    ->disabled()
                    ->default(fn () => (string) Str::uuid()),

              
                TextInput::make('total_payable')
                    ->label('Total Payable')
                    ->required()
                    ->type('number') 
                    ->step(0.01),

            
                TextInput::make('discount')
                    ->label('Discount')
                    ->required()
                    ->type('number')
                    ->step(1),

              
                TextInput::make('final_amount')
                    ->label('Final Amount')
                    ->required()
                    ->type('number') 
                    ->step(0.01), 
                    

               
                BelongsToSelect::make('customer_id')
                    ->label('Customer')
                    ->relationship('customer', 'name') 
                    ->required(),

                
                BelongsToSelect::make('created_by')
                    ->label('Created By')
                    ->relationship('createdBy', 'name') 
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('Order ID')
                    ->searchable()
                    ->formatStateUsing(fn (string $state): string => Str::limit($state, 8, '')),
                TextColumn::make('customer.name')
                    ->label('Customer')
                    ->searchable()
                    ->sortable(),
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
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
