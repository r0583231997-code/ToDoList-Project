import axios from 'axios';
console.log("My API URL is:", process.env.REACT_APP_API_URL);
// לניסיון בלבד - תמחקי את זה אחרי שזה יעבוד
// const apiUrl = "https://server-yepp.onrender.com";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
console.log("My API URL is:", apiUrl);
axios.defaults.baseURL = apiUrl;
axios.interceptors.response.use(
  response => response, // אם הכל בסדר, פשוט תעביר את התשובה הלאה
  error => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error); // תזרוק את השגיאה כדי שהאפליקציה תדע שמשהו קרה
  }
);

export default {
  // פונקציה לשליפת כל המשימות
  getTasks: async () => {
    // Axios כבר יודע להוסיף את ה-apiUrl לפני ה-/items
    const result = await axios.get('/items');    
    return result.data;
  },

addTask: async (name) => {
    console.log('addTask', name);
    // אנחנו עושים POST לנתיב /items ושולחים אובייקט עם השם והסטטוס
    const result = await axios.post('/items', { name: name, isComplete: false });
    return result.data; // מחזירים את המשימה החדשה שנוצרה (כולל ה-ID שהיא קיבלה מהמסד)
  },


setCompleted: async (id, isComplete, name) => {
    const result = await axios.put(`/items/${id}`, { 
      id: id, 
      name: name, 
      isComplete: isComplete 
    });
    return result.data;
  },

deleteTask: async (id) => {
    console.log('deleteTask', id);
    // אנחנו מבקשים מהשרת למחוק את הפריט עם ה-ID הספציפי
    const result = await axios.delete(`/items/${id}`);
    return result.data;
  }
};
