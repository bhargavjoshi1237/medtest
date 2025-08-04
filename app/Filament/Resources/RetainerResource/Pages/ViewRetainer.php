<?php

namespace App\Filament\Resources\RetainerResource\Pages;

use App\Filament\Resources\RetainerResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewRetainer extends ViewRecord
{
    protected static string $resource = RetainerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
