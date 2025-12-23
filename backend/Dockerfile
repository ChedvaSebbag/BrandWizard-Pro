FROM node:18

WORKDIR /app

# העתקת קבצי ה-JSON קודם כדי לנצל את ה-Cache
COPY package*.json ./

# הגדרה המאפשרת התקנה בסביבת אינטרנט עם סינון (פותר את שגיאת ה-SSL)
RUN npm config set strict-ssl false

# התקנת החבילות
RUN npm install

# העתקת שאר הקוד
COPY . .

EXPOSE 5000

CMD ["node", "app.js"]