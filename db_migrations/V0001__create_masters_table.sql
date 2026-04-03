
CREATE TABLE t_p48512077_beauty_app_design.masters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    role VARCHAR(100) NOT NULL,
    experience_years INTEGER DEFAULT 0,
    specializations TEXT[] DEFAULT '{}',
    rating NUMERIC(2,1) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    avatar_initial CHAR(1),
    is_available BOOLEAN DEFAULT true,
    bio TEXT,
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p48512077_beauty_app_design.masters (name, role, experience_years, specializations, rating, reviews_count, avatar_initial, is_available) VALUES
  ('Анастасия Волкова', 'Колорист-стилист', 8, ARRAY['Сложное окрашивание', 'Кератин', 'Стрижки'], 4.9, 147, 'А', true),
  ('Екатерина Морозова', 'Nail-мастер', 6, ARRAY['Маникюр', 'Педикюр', 'Nail-art'], 4.8, 203, 'Е', true),
  ('Мария Соколова', 'Бьюти-эксперт', 10, ARRAY['Перманентный макияж', 'Уход за лицом', 'Брови'], 5.0, 89, 'М', false),
  ('Диана Лебедева', 'Стилист', 5, ARRAY['Стрижки', 'Укладки', 'Свадебные образы'], 4.7, 124, 'Д', true);
