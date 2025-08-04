<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions;
use Filament\Actions\Action;
use Filament\Resources\Pages\CreateRecord;
use Filament\Forms\Components\TextInput;
use App\Models\Product; 
use Illuminate\Support\Facades\DB; 
use App\Models\Notification;
use App\Models\User;
use App\Models\Customer;    

class CreateOrder extends CreateRecord
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('New User')
                ->icon('heroicon-o-user-plus')
                ->form([
                    TextInput::make('name')
                        ->label('Name')
                        ->required(),
                    TextInput::make('contact')
                        ->label('Contact')
                        ->numeric(),
                ])
                ->action(function (array $data, $record) {
                    $user = Customer::create([
                        'name' => $data['name'],
                        'contact' => $data['contact'],
                    ]);
                }),
        ];
    }

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
                $product = Product::find($item['id']);
                if ($product) {
                    $newQuantity = max(0, $product->quantity - $item['quantity']);
                    $product->quantity = $newQuantity;
                    $product->save();

                    if ($product->quantity < $product->alert_quantity) {
                        Notification::create([
                            'type' => $product->name,
                            'notifiable_type' => 'Low Stock Alert, Now at ' . $product->quantity,
                            'notifiable_id' => $product->id,
                            'data' => [
                                'message' => "Low stock alert for product: {$product->name}",
                                'product_id' => $product->id,
                                'current_quantity' => $product->quantity,
                            ],
                        ]);
                    }
                }
            }
        }
        $this->record->products()->sync($syncData);
    }
}


