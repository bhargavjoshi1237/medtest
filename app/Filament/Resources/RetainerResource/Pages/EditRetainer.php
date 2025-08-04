<?php

namespace App\Filament\Resources\RetainerResource\Pages;

use App\Filament\Resources\RetainerResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use App\Models\Product;
use App\Models\Retainer;
use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Model;

class EditRetainer extends EditRecord
{
    protected static string $resource = RetainerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->after(function (Retainer $record) {
                    $product = $record->product;
                    if ($product) {
                        $product->quantity += $record->quantity;
                        $product->save();
                    }
                }),
            Actions\ViewAction::make(),
        ];
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $originalQuantity = $record->quantity;
        $newQuantity = $data['quantity'];
        $quantityDifference = $newQuantity - $originalQuantity;

        if ($quantityDifference !== 0) {
            $product = $record->product;
            if ($product) {
                if ($quantityDifference > 0 && $product->quantity < $quantityDifference) {
                    Notification::make()
                        ->title('Not enough stock.')
                        ->body("Cannot increase retainer quantity. Only {$product->quantity} items available in stock.")
                        ->danger()
                        ->send();
                    
                    $this->halt();
                }

                $product->quantity -= $quantityDifference;
                $product->save();
            }
        }

        $record->update($data);

        return $record;
    }
}
