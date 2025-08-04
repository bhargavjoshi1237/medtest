<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use App\Filament\Resources\OrderResource\RelationManagers\ProductsRelationManager;
use Filament\Actions;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\Section;
use Filament\Resources\Pages\ViewRecord;

class ViewOrder extends ViewRecord
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Order Information')
                    ->schema([
                        TextEntry::make('id')
                            ->label('Order ID'),
                        TextEntry::make('customer.name')
                            ->label('Customer'),
                        TextEntry::make('createdBy.name')
                            ->label('Created By'),
                        TextEntry::make('created_at')
                            ->label('Created At')
                            ->dateTime(),
                    ])
                    ->columns(2),
                
                Section::make('Order Summary')
                    ->schema([
                        TextEntry::make('total_payable')
                            ->label('Total Payable')
                            ->money('USD'),
                        TextEntry::make('discount')
                            ->label('Discount')
                            ->suffix('%'),
                        TextEntry::make('final_amount')
                            ->label('Final Amount')
                            ->money('USD'),
                    ])
                    ->columns(3),
            ]);
    }

    public function getRelationManagers(): array
    {
        return [
            ProductsRelationManager::class,
        ];
    }
}