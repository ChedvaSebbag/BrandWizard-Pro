FROM node:18

WORKDIR /app

# העתקת קבצי ההגדרות
COPY package*.json ./

# **התיקון הקריטי**: מאפשר הורדת חבילות בסביבה עם סינון אינטרנט
RUN npm config set strict-ssl false

# התקנת החבילות (כעת זה יוריד את react-scripts בצורה תקינה)
RUN npm install

# העתקת שאר קבצי הפרויקט
COPY . .

EXPOSE 3000

# הרצת השרת וחשיפתו לרשת הדיוקר
CMD ["npm", "start", "--", "--host", "0.0.0.0"]