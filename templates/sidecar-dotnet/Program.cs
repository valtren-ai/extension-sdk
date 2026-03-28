var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/health", () => Results.Json(new
{
    ok = true,
    service = "__NAME__"
}));

app.MapPost("/analyze", (object? payload) => Results.Json(new
{
    ok = true,
    service = "__NAME__",
    message = "Replace this placeholder with your .NET sidecar logic.",
    input = payload
}));

app.MapPost("/hooks/{hookName}", (string hookName, object? payload) => Results.Json(new
{
    ok = true,
    hook = hookName,
    service = "__NAME__",
    received = payload
}));

app.Run();
