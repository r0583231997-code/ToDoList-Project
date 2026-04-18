using TodoApi;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
//הסווגר
// מוסיף שירות שחוקר את ה-Endpoints ב-API
builder.Services.AddEndpointsApiExplorer();
// מייצר את התיעוד של Swagger
builder.Services.AddSwaggerGen();

//הכורס
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()   // מאפשר לכל כתובת לפנות ל-API
              .AllowAnyMethod()   // מאפשר את כל הפעולות (GET, POST, וכו')
              .AllowAnyHeader();  // מאפשר לשלוח את כל סוגי ה-Headers
    });
});

// הזרקת ה-Context - זה מה שחסר לשרת!
var connectionString = builder.Configuration.GetConnectionString("ToDoDB");
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        // שורה זו עוזרת למנוע שגיאות ניתוב
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty; // זה יפתח את Swagger ישר בכתובת הראשית
    });
}

// אומר לשרת להשתמש בפוליסה שהגדרנו למעלה
app.UseCors("AllowAll");

app.MapGet("/", () => "succsed!");

app.MapGet("/items", async ([FromServices] ToDoDbContext db) => 
    await db.Items.ToListAsync());

app.MapPost("/items", async ([FromServices] ToDoDbContext db, Item newItem) =>
{
    db.Items.Add(newItem);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{newItem.Id}", newItem);
});

app.MapPut("/items/{id}", async ([FromServices] ToDoDbContext db, int id, Item inputItem) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    item.Name = inputItem.Name; // הוספתי את זה כדי שגם השם יתעדכן
    item.IsComplete = inputItem.IsComplete; 
    
    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.MapDelete("/items/{id}", async ([FromServices] ToDoDbContext db, int id) =>
{
    if (await db.Items.FindAsync(id) is Item item)
    {
        db.Items.Remove(item);
        await db.SaveChangesAsync();
        return Results.Ok(item);
    }
    return Results.NotFound();
});

app.Run();

