# מצב ארכיטקטורה וכללים טכניים (Architecture & Tech Rules)

## סטנדרט טכנולוגי (Tech Stack)
- **Frontend Framework**: React 18+ (דרך Vite)
- **שפה**: TypeScript (מומלץ) או JavaScript
- **עיצוב (Styling)**: Vanilla CSS / CSS Modules עם משתני CSS גלובליים (CSS Variables).
- **ניווט (Routing)**: מבוסס State (מכיוון שזהו דמו ליניארי מבוסס מסכים בתצוגת גלילה, נשתמש ב-Context כדי לעקוב אחר המסך הנוכחי ונגלול אליו).

## תצורת פרויקט (Folder Structure)
- `/src/components`: רכיבי UI קטנים ורב-פעמיים (Buttons, Cards).
- `/src/screens`: מסכים מרכזיים (Screen1 - Screen7).
- `/src/styles`: הגדרות עיצוב גלובליות, פלטות צבעים ואנימציות (index.css).
- `/src/store` / `/src/context`: ניהול state של הדמו (App State).

## כללי התנהגות אפליקציה (App Behavior)
1. **Scroll Snap**: האפליקציה בנויה כמסכים של `100dvh`. במקרה של גלילה ידנית, יש להשתמש ב-`scroll-snap-type: y mandatory`.
2. **אנימציות ומעברים**: מעברים חלקים (Smooth Scrolling) במעבר בין שלבים לאחר אינטראקציה. 
3. **ניהול זיכרון (State Management)**: שימוש ב-React Context לשמירת הנתונים המוזנים (בחירת מיקוד, אישורי בטיחות, קביעת תור).

## החלטות עיצוב (Design System)
- **טיפוגרפיה**: Heebo או Assistant.
- **צבעוניות**: מעבר מבהיר (חול/פנינה) לכחול-ים עמוק.
- **אפקטים**: Glassmorphism באמצעות `backdrop-filter: blur(10px)`.
- **כפתורים**: שוליים מעוגלים, אפקט Ripple ואנימציית Hover קלה.

## כללים לבדיקות פרויקט (Testing)
- וידוא קיומם של מזהים ייחודיים (IDs/data-testid) על מנת לאפשר אוטומציה.
- בדיקות דפדפן יוודאו את קיום הפונקציונליות באמצעות /browser.

## נהלי עבודה עם Git ו-GitHub Actions
- סוכנים נדרשים תמיד לסנכרן את מאגר הגיט המרכזי. יש לוודא עדכניות עם שאר חברי הצוות ולהעלות שינויים תקינים בלבד.
- קיים מנגנון Deployment מבוסס GitHub Actions. לפני כל ביצוע של `git push`, חובה לוודא שתיקיית `client` מתקמפלת תקין על ידי הרצת `npm run build` כדי למנוע שבירה של ה-Deploy האוטומטי. כל שינוי חייב לעבור בדיקת תקינות.
