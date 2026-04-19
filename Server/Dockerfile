# שלב 1: שימוש ב-SDK של .NET 8 כדי לבנות את הקוד
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# העתקת קובץ הפרויקט (מכיוון שאנחנו כבר בתוך תיקיית Server, הנתיב הוא פשוט שם הקובץ)
COPY ["TodoApi.csproj", "./"]
RUN dotnet restore "TodoApi.csproj"

# העתקת שאר הקבצים של השרת
COPY . .

# בנייה ופרסום של האפליקציה לתיקיית /app/publish
RUN dotnet publish "TodoApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# שלב 2: שימוש ב-Runtime קטן ומהיר להרצה
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443

# העתקת התוצאה המוכנה משלב הבנייה
COPY --from=build /app/publish .

# פקודת ההרצה
ENTRYPOINT ["dotnet", "TodoApi.dll"]