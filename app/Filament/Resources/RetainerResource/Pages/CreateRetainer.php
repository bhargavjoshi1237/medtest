<?php

namespace App\Filament\Resources\RetainerResource\Pages;

use App\Filament\Resources\RetainerResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateRetainer extends CreateRecord
{
    protected static string $resource = RetainerResource::class;

    protected function afterCreate(): void
    {
        $retainer = $this->record;
        $product = $retainer->product;

        if ($product) {
            $product->quantity -= $retainer->quantity;
            $product->save();
        }
    }
}
