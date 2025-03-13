import { useState } from "react";
import styles from "./App.module.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return emailRegex.test(email);
}; //в идеале - вынести в отдельный файл и импортировать

const App = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name поле обязательное для заполнения";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Пустой или неверный email адрес";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="firstName">First Name *</label>
        <input
          className={`${styles.input} ${errors.firstName ? styles.error : ""}`}
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Иван"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && (
          <span className={styles.error}>{errors.firstName}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="lastName">Last Name</label>
        <input
          className={styles.input}
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Иванов"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email *</label>
        <input
          className={`${styles.input} ${errors.email ? styles.error : ""}`}
          id="email"
          name="email"
          type="email"
          placeholder="ivan@mail.ru"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Регистрация</button>
    </form>
  );
};

export default App;
