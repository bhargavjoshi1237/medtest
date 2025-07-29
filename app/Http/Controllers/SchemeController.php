<?php

namespace App\Http\Controllers;

use App\Models\Scheme;
use Inertia\Inertia;
use App\Http\Requests\StoreSchemeRequest;
use App\Http\Requests\UpdateSchemeRequest;
use App\Repositories\SchemeRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;

class SchemeController extends BaseController
{

    public function __construct(public SchemeRepository $schemeRepository) {}

    public function index()
    {
        $schemes = $this->schemeRepository->getAll();
        return Inertia::render('Scheme/Index', [
            'schemes' => $schemes
        ]);
    }

    public function create()
    {
        return Inertia::render('Scheme/Create');
    }

    public function store(StoreSchemeRequest $request)
    {
        DB::beginTransaction();
        try {
            $this->schemeRepository->store($request->validated());
            DB::commit();
            return $this->sendRedirectResponse(route('scheme.index'), 'Scheme created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectBackError('Failed to create scheme.');
        }
    }

    public function show(Scheme $scheme)
    {
        return Inertia::render('Scheme/Show', [
            'scheme' => $scheme
        ]);
    }

    public function edit(Scheme $scheme)
    {
        return Inertia::render('Scheme/Edit', [
            'scheme' => $scheme
        ]);
    }

    public function update(UpdateSchemeRequest $request, Scheme $scheme)
    {
        DB::beginTransaction();
        try {
            $scheme->update($request->validated());
            DB::commit();
            return $this->sendRedirectResponse(route('scheme.index'), 'Scheme updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectBackError('Failed to update scheme.');
        }
    }

    public function destroy(Scheme $scheme)
    {
        DB::beginTransaction();
        try {
            $this->schemeRepository->destroy($scheme->id);
            DB::commit();
            return $this->sendRedirectResponse(route('scheme.index'), 'Scheme deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectBackError('Failed to delete scheme.');
        }
    }
}
