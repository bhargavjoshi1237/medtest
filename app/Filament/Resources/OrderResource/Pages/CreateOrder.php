<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Models\Product; 
use Illuminate\Support\Facades\DB; 

class CreateOrder extends CreateRecord
{
    protected static string $resource = OrderResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['products'] = collect($data['products'] ?? [])
            ->map(fn ($item) => [
                'id' => $item['id'],
                'quantity' => $item['quantity'],
            ])
            ->toArray();

        return $data;
    }

    protected function afterCreate(): void
    {
        $products = $this->form->getState()['products'] ?? [];
        $syncData = [];
        foreach ($products as $item) {
            if (!empty($item['id']) && !empty($item['quantity'])) {
                $syncData[$item['id']] = ['quantity' => $item['quantity']];
                Product::where('id', $item['id'])
                    ->decrement('quantity', $item['quantity']);
            }
        }
        $this->record->products()->sync($syncData);
    }
}


