<?php

namespace App\Filament\Resources\CustomerResource\Pages;

use App\Filament\Resources\CustomerResource;
use App\Filament\Resources\CustomerResource\RelationManagers\OrdersRelationManager;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\Section;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Actions\Action;
use App\Models\Scheme;
use App\Models\Userspecificdiscounts;

class ViewCustomer extends ViewRecord
{
    protected static string $resource = CustomerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
            Action::make('Set User Discount')
                ->form([
                    TextInput::make('discount')
                        ->label('Fixed Discount (%)')
                        ->numeric()
                        ->minValue(0)
                        ->maxValue(100)
                        ->step(0.01)
                        ->required()
                        ->default(function ($record) {
                            return $record->userSpecificDiscount?->discount ?? 0;
                        }),
                ])
                ->action(function (array $data, $record) {
                    Userspecificdiscounts::updateOrCreate(
                        ['customer_id' => $record->id],
                        ['discount' => $data['discount']]
                    );
                    
                    // Show success notification
                    \Filament\Notifications\Notification::make()
                        ->title('Discount Updated')
                        ->body("Fixed discount of {$data['discount']}% has been set for {$record->name}")
                        ->success()
                        ->send();
                })
                ->modalHeading('Set Fixed Discount for Customer')
                ->modalSubmitActionLabel('Save Discount')
                ->color('primary')
                ->icon('heroicon-o-percent-badge'),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Customer Information')
                    ->schema([
                        TextEntry::make('name')
                            ->label('Name'),
                        TextEntry::make('contact')
                            ->label('Contact'),
                        TextEntry::make('created_at')
                            ->label('Created At')
                            ->dateTime(),
                    ])
                    ->columns(2),
                
                Section::make('Discount Information')
                    ->schema([
                        TextEntry::make('userSpecificDiscount.discount')
                            ->label('Fixed Discount')
                            ->default('No discount set')
                            ->formatStateUsing(function ($state) {
                                return $state ? $state . '%' : 'No discount set';
                            }),
                        TextEntry::make('orders_count')
                            ->label('Total Orders')
                            ->getStateUsing(function ($record) {
                                return $record->orders()->count();
                            }),
                    ])
                    ->columns(2),
            ]);
    }

    public function getRelationManagers(): array
    {
        return [
            OrdersRelationManager::class,
        ];
    }
}
