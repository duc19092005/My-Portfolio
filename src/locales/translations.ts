export const translations = {
  en: {
    nav: {
      about: "ABOUT",
      skills: "SKILLS",
      projects: "PROJECTS",
      awards: "AWARDS",
      contact: "CONTACT",
      btnContact: "CONTACT.sh"
    },
    hero: {
      eyebrow: "SYSTEMS_ACTIVE",
      title: "TRẦN ANH ĐỨC",
      subtitle: "Backend Developer / Systems Engineer",
      subtext: "Building highly scalable backend services and robust system architectures. Specializing in secure API design, database performance optimization, and reliable infrastructure.",
      btnProjects: "View My Projects",
      btnContact: "Get In Touch",
      monitorTitle: "SYS_MONITOR",
      portBind: "PORT_BIND",
      database: "DATABASE",
      env: "ENV",
      envValue: "Production"
    },
    about: {
      eyebrow: "01 // ARCHITECTURE",
      title: "BEHIND THE SYSTEMS",
      bioParagraphs: [
        "I am a Software Engineering student at HUFLIT University specializing in backend systems and database engineering. I design and build resilient, distributed backend architectures that optimize performance and scale under pressure.",
        "Leveraging technologies like .NET/ASP.NET Core and Node.js (ExpressJS), I focus on clean code design patterns, modular services, and secure API integrations to build reliable real-world systems.",
        "My analytical approach and hackathon experience have trained me to solve complex infrastructural problems under strict deadlines, working to construct backend architectures that prioritize uptime, thread safety, and decoupled dependencies."
      ],
      timelineTitle: "SYSTEM CHRONOLOGY",
      timelineItems: [
        {
          date: "2026.Q1 — 2026.Q2",
          title: "Cinema Management System",
          desc: "Solo Project: Architected decoupled backend with 30+ RESTful APIs using ASP.NET Core & MS SQL."
        },
        {
          date: "2025.Q4",
          title: "Drug Traceability dApp",
          desc: "Pione Hackathon 2025: Co-developed DDD backend and integrated smart contract event listeners via Hardhat."
        },
        {
          date: "2023 — 2027",
          title: "Software Engineering Major",
          desc: "HUFLIT University: Core focus on Data Structures, OOP, Algorithms, and DBMS."
        }
      ]
    },
    skills: {
      eyebrow: "02 // CAPABILITIES",
      title: "SKILLS INVENTORY",
      groups: {
        languages: "Programming Languages",
        frameworks: "Frameworks & ORMs",
        databases: "Databases",
        tools: "Tools & Architectures",
        spoken: "Spoken Languages"
      },
      spokenItems: [
        { name: "Vietnamese (Native)", level: 100 },
        { name: "English (Professional)", level: 75 }
      ]
    },
    projects: {
      eyebrow: "03 // ARTIFACTS",
      title: "PROJECTS LOG",
      badgeSolo: "SOLO DEV",
      badgeHackathon: "3RD PLACE HACKATHON",
      repoLink: "Repository",
      liveLink: "Live Demo",
      videoLink: "Demo Video",
      items: {
        cinema: {
          title: "CINEMA MANAGEMENT SYSTEM",
          role: "Backend Developer (Solo Project)",
          desc: [
            "Designed and built a modular backend from scratch using ASP.NET Core and MS SQL, applying SOLID principles and the Factory pattern.",
            "Implemented secure token-based authentication (JWT) with Role-Based Access Control (RBAC) stored via secure HttpOnly cookies.",
            "Containerized the API service using Docker, improving pipeline deployments and streamlining local development environments."
          ]
        },
        traceability: {
          title: "DRUG TRACEABILITY DAPP",
          role: "Backend & Blockchain Developer",
          desc: [
            "Co-developed a decentralized backend using ExpressJS and MongoDB, following Domain-Driven Design (DDD) principles.",
            "Integrated REST APIs with blockchain smart contracts (Solidity) via Hardhat to trace supply chain logistics.",
            "Secured telemetry record storage using Mongoose schemas and optimized query execution time for supply audits."
          ]
        }
      }
    },
    achievements: {
      eyebrow: "04 // SIGNALS",
      title: "Pione Hackathon 2025",
      subtitle: "3rd Place · Team: Dev Chicken HUFLIT",
      desc: "Awarded 3rd place for developing the decentralized 'Drug Traceability' platform, co-designing the database logs, and establishing API integrations with smart contracts."
    },
    contact: {
      eyebrow: "05 // CONNECTION",
      title: "GET IN TOUCH",
      subtext: "I am currently seeking Backend Developer Intern & Junior positions to collaborate on real-world systems. Drop me a line, and let's build something secure and scalable together.",
      address: "Binh Thanh District, Ho Chi Minh City, Vietnam",
      labelName: "SENDER NAME",
      labelEmail: "EMAIL ADDRESS",
      labelMessage: "MESSAGE",
      placeholderName: "Your Name",
      placeholderEmail: "you@example.com",
      placeholderMessage: "Write your message here...",
      btnSend: "SEND MESSAGE",
      btnSending: "SENDING...",
      btnSuccess: "MESSAGE SENT",
      msgSuccess: "Thank you! Your message has been sent successfully.",
      msgError: "Error: Please fill in all fields correctly."
    },
    footer: {
      about: "ABOUT",
      projects: "PROJECTS",
      github: "GITHUB"
    },
    sidenav: {
      hero: "HERO",
      about: "ABOUT",
      skills: "SKILLS",
      projects: "PROJECTS",
      awards: "AWARDS",
      contact: "CONTACT"
    }
  },
  vi: {
    nav: {
      about: "GIỚI THIỆU",
      skills: "KỸ NĂNG",
      projects: "DỰ ÁN",
      awards: "GIẢI THƯỞNG",
      contact: "LIÊN HỆ",
      btnContact: "LIEN_HE.sh"
    },
    hero: {
      eyebrow: "HE_THONG_KICH_HOAT",
      title: "TRẦN ANH ĐỨC",
      subtitle: "Lập trình viên Backend / Kỹ sư Hệ thống",
      subtext: "Xây dựng các dịch vụ backend hiệu năng cao và kiến trúc hệ thống bền vững. Chuyên sâu về thiết kế API bảo mật, tối ưu hóa cơ sở dữ liệu và hạ tầng đáng tin cậy.",
      btnProjects: "Xem Dự Án Của Tôi",
      btnContact: "Liên Hệ Ngay",
      monitorTitle: "BANG_GIAM_SAT",
      portBind: "CONG_KET_NOI",
      database: "CO_SO_DU_LIEU",
      env: "MOI_TRUONG",
      envValue: "Vận hành (Production)"
    },
    about: {
      eyebrow: "01 // KIẾN TRÚC",
      title: "PHÍA SAU HỆ THỐNG",
      bioParagraphs: [
        "Tôi là sinh viên ngành Kỹ thuật Phần mềm tại Đại học HUFLIT, chuyên sâu về kỹ thuật hệ thống backend và cơ sở dữ liệu. Tôi thiết kế và xây dựng các kiến trúc backend phân tán bền vững, giúp tối ưu hóa hiệu năng và mở rộng dưới áp lực lớn.",
        "Sử dụng các công nghệ như .NET/ASP.NET Core và Node.js (ExpressJS), tôi tập trung vào các mẫu thiết kế mã nguồn sạch, dịch vụ mô-đun và tích hợp API bảo mật nhằm xây dựng các hệ thống thực tế đáng tin cậy.",
        "Tư duy phân tích và kinh nghiệm thi đấu hackathon đã giúp tôi rèn luyện kỹ năng giải quyết các vấn đề hạ tầng phức tạp dưới áp lực thời gian, hướng đến việc kiến thiết các hệ thống tối ưu hóa thời gian hoạt động, an toàn luồng và giảm thiểu phụ thuộc."
      ],
      timelineTitle: "LỊCH SỬ HỆ THỐNG",
      timelineItems: [
        {
          date: "Q1.2026 — Q2.2026",
          title: "Hệ thống Quản lý Rạp chiếu phim",
          desc: "Dự án cá nhân: Thiết kế kiến trúc backend độc lập với hơn 30 RESTful APIs bằng ASP.NET Core & MS SQL."
        },
        {
          date: "Q4.2025",
          title: "dApp Truy xuất Nguồn gốc Thuốc",
          desc: "Pione Hackathon 2025: Đồng phát triển backend theo mô hình DDD và tích hợp lắng nghe sự kiện hợp đồng thông minh qua Hardhat."
        },
        {
          date: "2023 — 2027",
          title: "Chuyên ngành Kỹ thuật Phần mềm",
          desc: "Đại học HUFLIT: Tập trung nghiên cứu Cấu trúc dữ liệu, OOP, Giải thuật và Hệ quản trị CSDL."
        }
      ]
    },
    skills: {
      eyebrow: "02 // NĂNG LỰC",
      title: "DANH MỤC KỸ NĂNG",
      groups: {
        languages: "Ngôn ngữ lập trình",
        frameworks: "Frameworks & ORMs",
        databases: "Cơ sở dữ liệu",
        tools: "Công cụ & Kiến trúc",
        spoken: "Ngôn ngữ giao tiếp"
      },
      spokenItems: [
        { name: "Tiếng Việt (Bản ngữ)", level: 100 },
        { name: "Tiếng Anh (Lưu loát)", level: 75 }
      ]
    },
    projects: {
      eyebrow: "03 // DỮ LIỆU DỰ ÁN",
      title: "NHẬT KÝ DỰ ÁN",
      badgeSolo: "SOLO DEV",
      badgeHackathon: "GIẢI BA HACKATHON",
      repoLink: "Mã Nguồn",
      liveLink: "Bản Demo",
      videoLink: "Video Demo",
      items: {
        cinema: {
          title: "HỆ THỐNG QUẢN LÝ RẠP CHIẾU PHIM",
          role: "Lập trình viên Backend (Dự án Cá nhân)",
          desc: [
            "Thiết kế và xây dựng kiến trúc backend dạng tách biệt (decoupled) từ đầu, áp dụng nguyên lý SOLID và Factory pattern.",
            "Triển khai cơ chế xác thực JWT kết hợp phân quyền RBAC bảo mật cao, lưu trữ token thông qua HttpOnly Cookies để chống tấn công đánh cắp phiên.",
            "Đóng gói dịch vụ API bằng Docker, giúp tiêu chuẩn hóa môi trường phát triển local và tối ưu hóa quy trình triển khai."
          ]
        },
        traceability: {
          title: "DAPP TRUY XUẤT NGUỒN GỐC THUỐC",
          role: "Lập trình viên Backend & Blockchain",
          desc: [
            "Đồng phát triển ứng dụng backend phi tập trung bằng ExpressJS và MongoDB, áp dụng các nguyên lý thiết kế Domain-Driven Design (DDD).",
            "Tích hợp các cổng REST APIs với hợp đồng thông minh blockchain (Solidity) qua thư viện Hardhat để truy xuất chuỗi cung ứng.",
            "Bảo mật và chuẩn hóa lưu trữ lịch sử dữ liệu bằng Mongoose schemas, tối ưu hóa tốc độ truy vấn phục vụ việc kiểm toán nguồn gốc."
          ]
        }
      }
    },
    achievements: {
      eyebrow: "04 // TÍN HIỆU",
      title: "Pione Hackathon 2025",
      subtitle: "Giải Ba · Đội tuyển: Dev Chicken HUFLIT",
      desc: "Đoạt giải Ba chung cuộc nhờ phát triển ứng dụng phi tập trung 'Truy xuất nguồn gốc thuốc', thiết kế cấu trúc lưu trữ cơ sở dữ liệu và tích hợp API với các smart contract trên blockchain."
    },
    contact: {
      eyebrow: "05 // KẾT NỐI",
      title: "GỬI TIN NHẮN",
      subtext: "Tôi hiện đang tìm kiếm cơ hội thực tập và vị trí Junior Backend Developer để cống hiến cho các dự án thực tế. Hãy để lại tin nhắn và cùng nhau xây dựng các hệ thống bảo mật, ổn định.",
      address: "Quận Bình Thạnh, TP. Hồ Chí Minh, Việt Nam",
      labelName: "TÊN NGƯỜI GỬI",
      labelEmail: "ĐỊA CHỈ EMAIL",
      labelMessage: "NỘI DUNG",
      placeholderName: "Tên của bạn",
      placeholderEmail: "ten@vi-du.com",
      placeholderMessage: "Nhập nội dung tin nhắn...",
      btnSend: "GỬI TIN NHẮN",
      btnSending: "ĐANG GỬI...",
      btnSuccess: "ĐÃ GỬI XONG",
      msgSuccess: "Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.",
      msgError: "Lỗi: Vui lòng nhập đầy đủ các trường thông tin."
    },
    footer: {
      about: "GIỚI THIỆU",
      projects: "DỰ ÁN",
      github: "GITHUB"
    },
    sidenav: {
      hero: "TRANG ĐẦU",
      about: "GIỚI THIỆU",
      skills: "KỸ NĂNG",
      projects: "DỰ ÁN",
      awards: "GIẢI THƯỞNG",
      contact: "LIÊN HỆ"
    }
  },
  ru: {
    nav: {
      about: "ОБ АВТОРЕ",
      skills: "НАВЫКИ",
      projects: "ПРОЕКТЫ",
      awards: "НАГРАДЫ",
      contact: "КОНТАКТЫ",
      btnContact: "CONTACT.sh"
    },
    hero: {
      eyebrow: "SYSTEMS_ACTIVE",
      title: "TRẦN ANH ĐỨC",
      subtitle: "Backend-разработчик / Системный инженер",
      subtext: "Разработка высокомасштабируемых серверных служб и надежных системных архитектур. Специализируюсь на безопасном проектировании API, оптимизации баз данных и надежной инфраструктуре.",
      btnProjects: "Посмотреть Мои Проекты",
      btnContact: "Связаться Со Мной",
      monitorTitle: "SYS_MONITOR",
      portBind: "PORT_BIND",
      database: "БАЗА ДАННЫХ",
      env: "СРЕДА",
      envValue: "Продакшн"
    },
    about: {
      eyebrow: "01 // АРХИТЕКТУРА",
      title: "ЗА КУЛИСАМИ СИСТЕМ",
      bioParagraphs: [
        "Я студент факультета программной инженерии в Университете HUFLIT, специализируюсь на бэкенд-системах и проектировании баз данных. Я проектирую и создаю отказоустойчивые, распределенные бэкенд-архитектуры, которые оптимизируют производительность и масштабируются под высокой нагрузкой.",
        "Используя такие технологии, как .NET/ASP.NET Core и Node.js (ExpressJS), я сосредотачиваюсь на шаблонах чистого кода, модульных сервисах и безопасной интеграции API для создания надежных реальных систем.",
        "Мой аналитический подход и опыт участия в хакатонах помогли мне научиться решать сложные инфраструктурные задачи в сжатые сроки, создавая бэкенд-архитектуры с приоритетом на доступность (uptime), потокобезопасность (thread safety) и развязку зависимостей (decoupling)."
      ],
      timelineTitle: "СИСТЕМНАЯ ХРОНОЛОГИЯ",
      timelineItems: [
        {
          date: "2026.Q1 — 2026.Q2",
          title: "Система Управления Кинотеатром",
          desc: "Сольный проект: Разработал модульный бэкенд с более чем 30 RESTful API с использованием ASP.NET Core и MS SQL."
        },
        {
          date: "2025.Q4",
          title: "dApp Отслеживания Лекарств",
          desc: "Pione Hackathon 2025: Совместно разработал бэкенд по модели DDD и интегрировал слушатели событий смарт-контрактов через Hardhat."
        },
        {
          date: "2023 — 2027",
          title: "Программная инженерия (Специальность)",
          desc: "Университет HUFLIT: Основной упор на структуры данных, ООП, алгоритмы и СУБД."
        }
      ]
    },
    skills: {
      eyebrow: "02 // ВОЗМОЖНОСТИ",
      title: "КАРТА НАВЫКОВ",
      groups: {
        languages: "Языки программирования",
        frameworks: "Фреймворки и ORM",
        databases: "Базы данных",
        tools: "Инструменты и Архитектуры",
        spoken: "Иностранные языки"
      },
      spokenItems: [
        { name: "Вьетнамский (Родной)", level: 100 },
        { name: "Английский (Профессиональный)", level: 75 }
      ]
    },
    projects: {
      eyebrow: "03 // АРТИФАКТЫ",
      title: "ЖУРНАЛ ПРОЕКТОВ",
      badgeSolo: "SOLO DEV",
      badgeHackathon: "3-Е МЕСТО НА ХАКАТОНЕ",
      repoLink: "Репозиторий",
      liveLink: "Демо-версия",
      videoLink: "Видео Демо",
      items: {
        cinema: {
          title: "СИСТЕМА УПРАВЛЕНИЯ КИНОТЕАТРОМ",
          role: "Backend-разработчик (Сольный проект)",
          desc: [
            "Разработал модульный бэкенд с нуля с использованием ASP.NET Core и MS SQL, применяя принципы SOLID и шаблон проектирования Factory.",
            "Внедрил безопасную авторизацию на основе JWT с разграничением ролей доступа (RBAC), токены сохраняются в защищенных куках HttpOnly.",
            "Контейнеризировал API сервис с помощью Docker, стандартизировав локальное окружение и улучшив процесс деплоя."
          ]
        },
        traceability: {
          title: "DAPP ОТСЛЕЖИВАНИЯ ЛЕКАРСТВ",
          role: "Backend и Blockchain разработчик",
          desc: [
            "Совместно разработал децентрализованный бэкенд на ExpressJS и MongoDB с соблюдением подходов Domain-Driven Design (DDD).",
            "Интегрировал REST API со смарт-контрактами на Solidity с использованием Hardhat для трассировки поставок.",
            "Обеспечил безопасное хранение записей с помощью схем Mongoose, сократив время обработки аудиторских запросов."
          ]
        }
      }
    },
    achievements: {
      eyebrow: "04 // СИГНАЛЫ",
      title: "Pione Hackathon 2025",
      subtitle: "3-е место · Команда: Dev Chicken HUFLIT",
      desc: "Награжден 3-м местом за создание платформы 'Drug Traceability', совместное проектирование баз данных бэкенда и интеграцию API со смарт-контрактами."
    },
    contact: {
      eyebrow: "05 // СВЯЗЬ",
      title: "НАПИСАТЬ МНЕ",
      subtext: "В данный момент я ищу вакансии Backend Developer Intern / Junior для участия в коммерческих проектах. Оставьте сообщение, и давайте построим надежную систему вместе.",
      address: "Район Биньтхань, Хошимин, Вьетнам",
      labelName: "ИМЯ ОТПРАВИТЕЛЯ",
      labelEmail: "АДРЕС EMAIL",
      labelMessage: "СООБЩЕНИЕ",
      placeholderName: "Ваше имя",
      placeholderEmail: "you@example.com",
      placeholderMessage: "Введите ваше сообщение...",
      btnSend: "ОТПРАВИТЬСООБЩЕНИЕ",
      btnSending: "ОТПРАВКА...",
      btnSuccess: "ОТПРАВЛЕНО",
      msgSuccess: "Спасибо! Ваше сообщение было успешно отправлено.",
      msgError: "Ошибка: Пожалуйста, заполните все поля корректно."
    },
    footer: {
      about: "ОБ АВТОРЕ",
      projects: "ПРОЕКТЫ",
      github: "GITHUB"
    },
    sidenav: {
      hero: "НАЧАЛО",
      about: "ОБ АВТОРЕ",
      skills: "НАВЫКИ",
      projects: "ПРОЕКТЫ",
      awards: "НАГРАДЫ",
      contact: "КОНТАКТЫ"
    }
  }
};
