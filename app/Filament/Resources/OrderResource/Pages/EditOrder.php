<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class EditOrder extends EditRecord
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    public function mount($record): void
    {
        parent::mount($record);
        
        $this->form->fill([
            'products' => $this->record->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'quantity' => $product->pivot->quantity,
                ];
            })->toArray(),
        ]);
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $products = collect($data['products'] ?? [])
            ->filter(fn ($item) => !empty($item['id']) && !empty($item['quantity']))
            ->mapWithKeys(function ($item) {
                return [$item['id'] => ['quantity' => $item['quantity']]];
            });

        $this->record->products()->sync($products);

        unset($data['products']);
        return $data;
    }

    public function getRules(): array
    {
        return [
            'products' => ['required', 'array', 'min:1'],
            'products.*.id' => ['required', 'exists:products,id'],
            'products.*.quantity' => ['required', 'integer', 'min:1'],
        ];
    }
}
