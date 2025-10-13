<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class NotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notas = Auth::user()->notas()->latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $notas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titulo' => 'required|string|max:100',
                'contenido' => 'required|string',
                'imagen' => 'nullable|url|max:255',
                'fecha' => 'required|date'
            ]);

            $validated['user_id'] = Auth::id();

            $nota = Nota::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Nota creada exitosamente',
                'data' => $nota
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear la nota'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Nota $nota)
    {
        // Verificar que la nota pertenece al usuario autenticado
        if ($nota->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'No autorizado'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $nota
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nota $nota)
    {
        // Verificar que la nota pertenece al usuario autenticado
        if ($nota->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'No autorizado'
            ], 403);
        }

        try {
            $validated = $request->validate([
                'titulo' => 'required|string|max:100',
                'contenido' => 'required|string',
                'imagen' => 'nullable|url|max:255',
                'fecha' => 'required|date'
            ]);

            $nota->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Nota actualizada exitosamente',
                'data' => $nota->fresh()
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar la nota'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nota $nota)
    {
        // Verificar que la nota pertenece al usuario autenticado
        if ($nota->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'No autorizado'
            ], 403);
        }

        try {
            $nota->delete();

            return response()->json([
                'success' => true,
                'message' => 'Nota eliminada exitosamente'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar la nota'
            ], 500);
        }
    }

    /**
     * Remove multiple resources from storage.
     */
    public function destroyMultiple(Request $request)
    {
        try {
            $validated = $request->validate([
                'ids' => 'required|array',
                'ids.*' => 'integer|exists:notas,id'
            ]);

            $deletedCount = Nota::whereIn('id', $validated['ids'])
                ->where('user_id', Auth::id())
                ->delete();

            return response()->json([
                'success' => true,
                'message' => "{$deletedCount} nota(s) eliminada(s) exitosamente"
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar las notas'
            ], 500);
        }
    }
}
