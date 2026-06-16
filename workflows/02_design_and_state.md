# Workflow: הטמעת עיצוב ומערכת מצב (Design & State Management)

## מטרה
בניית השלד העיצובי (CSS חכם) ומערכת ניהול המצב ב-React.

## שלבי ביצוע
1. יצירת `src/styles/index.css` עם משתני שורש `:root` לצבעי מעבר, טיפוגרפיה.
2. הגדרת `scroll-snap-type: y mandatory` על ה-Container הראשי.
3. יצירת `src/context/AppContext.tsx` שיכיל ממשק Context לשמירת בחירות המשתמש: Goal, Safety, Documents, Appointment.
4. עטיפת קומפוננטת `App.tsx` ב-`AppProvider`.
5. יצירת קומפוננטת Layout בסיסית שלוקחת 100dvh לכל מסך.

## וידוא ותוצר
- שימוש באותיות Heebo.
- בדיקה מקומית (על ידי הדפסת ערכי הקונטקסט) שה-State מנוהל ללא איבוד נתונים במעבר בין קומפוננטות (ללא ריענון מלא).
