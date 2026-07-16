# Referencia de la API

## Autenticación
Por ahora, la API no requiere autenticación (esto puede agregarse en el futuro con JWT).


## Modelos de Datos

### Tutor
```json
{
  "id_tutor": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "DNI": "12345678",
  "telefono": "123456789",
  "correo": "juan.perez@example.com",
  "parentesco": "Padre"
}
```

### Entrenador
```json
{
  "id_entrenador": 1,
  "nombre": "Carlos",
  "apellido": "Gómez",
  "DNI": "87654321",
  "telefono": "987654321",
  "correo": "carlos.gomez@example.com",
  "especialidad": "Categorías formativas"
}
```

### Categoría
```json
{
  "id_categoria": 1,
  "nombre": "Sub-10",
  "anio_nacimiento": 2015,
  "id_entrenador": 1
}
```

### Jugador
```json
{
  "id_jugador": 1,
  "nombre": "Mateo",
  "apellido": "Pérez",
  "fecha_nacimiento": "2015-03-10",
  "DNI": "99111001",
  "fecha_inscripcion": "2025-01-15",
  "id_tutor": 1,
  "id_categoria": 1
}
```

### Asistencia
```json
{
  "id_asistencia": 1,
  "id_jugador": 1,
  "fecha": "2025-07-01",
  "presente": true,
  "observaciones": ""
}
```

### Cuota
```json
{
  "id_cuota": 1,
  "id_jugador": 1,
  "mes": "Enero 2025",
  "monto": 50.00,
  "fecha_vencimiento": "2025-01-10",
  "fecha_pago": null,
  "estado": "pendiente"
}
```


## Códigos de Estado
| Código | Descripción |
|--------|-------------|
| 200    | OK (éxito) |
| 201    | Creado (recurso creado con éxito) |
| 400    | Solicitud incorrecta (datos inválidos) |
| 404    | No encontrado |
| 500    | Error interno del servidor |
