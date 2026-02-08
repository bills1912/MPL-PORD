# MPL-PORD: Multi-Platform Palm Oil Ripeness Detector

<div align="center">
  <img src="public/MPL-PORD.png" alt="MPL-PORD Logo" width="200"/>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
  [![Flask](https://img.shields.io/badge/Flask-3.0-blue)](https://flask.palletsprojects.com/)
  [![Docker](https://img.shields.io/badge/Docker-Compose-blue)](https://www.docker.com/)
</div>

## 📋 Deskripsi

MPL-PORD adalah sistem pendeteksian tingkat kematangan buah kelapa sawit berbasis AI yang memanfaatkan teknologi YOLO (You Only Look Once) untuk melakukan deteksi otomatis. Sistem ini dapat mengidentifikasi 6 tingkat kematangan buah kelapa sawit secara real-time maupun dari video yang diunggah.

### Kategori Deteksi
- **Abnormal** (Kode: 0)
- **Empty Bunch** (Kode: 1)
- **Ripe** (Kode: 2) - Matang
- **Overripe** (Kode: 3) - Terlalu Matang
- **Underripe** (Kode: 4) - Kurang Matang
- **Unripe** (Kode: 5) - Tidak Matang

## ✨ Fitur Utama

- 🎥 **Deteksi Video**: Upload dan analisis video kelapa sawit
- 📹 **Streaming Real-time**: Deteksi langsung menggunakan webcam
- 🤖 **Multi-Model Support**: YOLOv8, YOLOv9C, YOLOv10, dan YOLOv11
- 📊 **Visualisasi Hasil**: Grafik dan tabel detail hasil deteksi
- 🎯 **Confidence Threshold**: Konfigurasi threshold deteksi
- 📈 **Export Data**: Export hasil deteksi ke CSV
- 🖼️ **Crop Detection**: Penyimpanan gambar hasil deteksi
- ⏱️ **Timestamp Navigation**: Navigasi hasil deteksi per detik
- 🌍 **Geolocation**: Pencatatan lokasi deteksi otomatis

## 🏗️ Arsitektur Sistem
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Next.js   │────▶│    Flask    │────▶│   Redis     │
│  (Frontend) │     │   (API)     │     │   (Queue)   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                    │                    │
       │                    ▼                    ▼
       │            ┌─────────────┐     ┌─────────────┐
       └───────────▶│    Nginx    │     │   Worker    │
                    │  (Reverse   │     │  (Process)  │
                    │   Proxy)    │     └─────────────┘
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ PostgreSQL  │
                    │ (Database)  │
                    └─────────────┘
```

## 📊 Performa Model

| Model | mAP | F1 Score | Keterangan |
|-------|-----|----------|------------|
| YOLOv8 | 0.688 | 0.620 | Model dasar dengan performa baik |
| YOLOv9C | 0.696 | 0.650 | Peningkatan akurasi dari v8 |
| YOLOv11 | 0.696 | 0.650 | Model terbaru dengan optimasi terbaik |

## 🚀 Quick Start

### Prerequisites

- Docker Desktop ([Download](https://www.docker.com/))
- Node.js 19+ ([Download](https://nodejs.org/))
- npm atau yarn
- Git

### Instalasi

1. **Clone Repository**
```bash
   git clone https://gitlab.com/billsar1912/palm-oil-detector.git
   cd palm-oil-detector
```

2. **Install Dependencies**
```bash
   npm install
```

3. **Konfigurasi Environment**
```bash
   cp ".env copy" .env
```
   
   Edit file `.env` sesuai kebutuhan:
```env
   NEXTAUTH_SECRET="your-secret-key"
   ADMIN_PASSWORD="your-admin-password"
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rdd_app?schema=public"
   BACKEND_URL="http://127.0.0.1:5000"
```

4. **Jalankan dengan Docker**
```bash
   docker compose up -d --build
```

5. **Akses Aplikasi**
   - Buka browser dan akses: `http://localhost:3125`
   - Login dengan kredensial:
     - Email: `admin@gmail.com`
     - Password: Sesuai `ADMIN_PASSWORD` di `.env`

## 📦 Struktur Project
```
palm-oil-detector/
├── components/          # React components
│   ├── Video/          # Komponen video processing
│   ├── Job/            # Komponen job management
│   └── Modal/          # Modal components
├── flask/              # Backend Flask
│   ├── detector.py     # Logic deteksi YOLO
│   ├── model/          # Model YOLO (.pt files)
│   └── worker.py       # Redis queue worker
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   ├── video/          # Halaman video
│   └── detection/      # Halaman deteksi
├── prisma/             # Database schema & migrations
├── public/             # Static files
│   ├── videos/         # Uploaded videos
│   └── detections/     # Detection results
├── nginx/              # Nginx configuration
└── docker-compose.yml  # Docker orchestration
```

## 🔧 Konfigurasi

### Model YOLO

Tambahkan model baru di `constants/other.constant.ts`:
```typescript
export const MODEL_LIST = [
  "YOLOv8", 
  "YOLOv9C", 
  "YOLOv10", 
  "YOLOv11",
  "YOLOv8 (Pods Detection)"
];
```

### Database Migration
```bash
# Generate migration
npx prisma migrate dev --name migration_name

# Apply migration in production
npx prisma migrate deploy

# Seed database
npm run prisma:seed
```

## 🎯 Penggunaan

### 1. Upload Video
1. Login ke aplikasi
2. Navigasi ke menu "Video"
3. Klik "Tambah Video"
4. Upload file video (.mp4)
5. Beri nama pada video

### 2. Deteksi Video
1. Buka detail video
2. Klik "Deteksi Video"
3. Pilih model YOLO
4. Konfigurasi parameter:
   - Confidence threshold (0.1 - 0.9)
   - Show confidence
   - Show labels
5. Klik "Deteksi"

### 3. Streaming Detection
1. Navigasi ke menu "Stream"
2. Izinkan akses kamera
3. Pilih model yang diinginkan
4. Klik "Live Detection" untuk mulai

### 4. Lihat Hasil
1. Navigasi ke "Daftar Deteksi"
2. Klik detail pada deteksi yang selesai
3. Lihat:
   - Video hasil dengan bounding box
   - Grafik jumlah deteksi per kelas
   - Tabel detail deteksi
   - Timeline deteksi per detik
   - Crop image hasil deteksi

## 🐳 Docker Services

| Service | Port | Deskripsi |
|---------|------|-----------|
| nginx | 3125 | Reverse proxy & static files |
| web | 3000 | Next.js application |
| flask | 5000 | Flask API server |
| worker | - | RQ worker untuk processing |
| redis | 6379 | Job queue |
| database | 5433 | PostgreSQL database |

### Docker Commands
```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs -f [service_name]

# Restart specific service
docker compose restart [service_name]

# Rebuild services
docker compose up -d --build
```

## 🛠️ Development

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run Flask backend
cd flask
python app.py

# Run Redis worker
cd flask
python worker.py
```

### Build untuk Production
```bash
npm run build
npm start
```

## 📚 API Documentation

### Video Endpoints
```
GET    /api/video          # Get all videos
POST   /api/video          # Upload video
GET    /api/video/:id      # Get video detail
DELETE /api/video/:id      # Delete video
```

### Job Endpoints
```
GET    /api/job            # Get all jobs
POST   /api/job            # Create detection job
GET    /api/job/:id        # Get job detail
DELETE /api/job/:id        # Delete job
```

### Flask Endpoints
```
GET    /                   # Health check
POST   /                   # Queue detection job
```

## 🧪 Testing
```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
MIT License

Copyright (c) 2026 Bill Van Ricardo Zalukhu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 👥 Team

- **Bill Van Ricardo Zalukhu** - *Developer* - [GitLab](https://gitlab.com/billsar1912)

## 🔗 Links

- **GitLab Repository**: [https://gitlab.com/billsar1912/palm-oil-detector](https://gitlab.com/billsar1912/palm-oil-detector)
- **Model Development**: COMING SOON!
- **Documentation**: See `/docs` folder

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Check port usage
lsof -i :3125
# Kill process
kill -9 [PID]
```

**Database connection error**
```bash
# Reset database
docker compose down -v
docker compose up -d
```

**Video upload fails**
- Check nginx `client_max_body_size` setting
- Verify disk space availability
- Check file permissions on `/public/videos`

## 📞 Support

Jika ada pertanyaan atau issue:
1. Buka issue di GitLab repository
2. Contact: billsar1912@gmail.com

## 🙏 Acknowledgments

- YOLO by Ultralytics
- Next.js team
- Flask team
- Prisma team
- Mantine UI library

---

<div align="center">
  Made with ❤️ by Bill Van Ricardo Zalukhu
  
  ⭐ Star this repository if you find it helpful!
</div>