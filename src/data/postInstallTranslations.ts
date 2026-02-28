import { PostInstallGuide } from './postInstallData';

export const POST_INSTALL_TRANSLATIONS: Record<string, PostInstallGuide[]> = {
  pt: [
    {
        "nome": "Ubuntu",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando atualiza a lista de pacotes e instala as novas versões disponíveis. O Ubuntu é a porta de entrada para muitos no Linux.",
        "drivers_adicionais": "Vá em 'Software e Atualizações' > 'Drivers Adicionais'. O Ubuntu facilita muito a instalação de drivers NVIDIA e outros proprietários.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Instala codecs para MP3, MP4 e fontes da Microsoft.",
        "software_essencial": {
            "navegador": "Firefox (padrão). Para Chrome: baixe o .deb no site oficial.",
            "office": "LibreOffice (padrão).",
            "outros": "VLC, GIMP, Spotify (via Snap ou APT)."
        },
        "personalizacao": "Usa GNOME. Explore as Extensões do GNOME e as configurações de aparência.",
        "loja_aplicativos": "Ubuntu Software (Snap Store)."
    },
    {
        "nome": "Debian",
        "base": "Independente",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "O Debian foca em estabilidade. Este comando mantém seu sistema 'Stable' seguro.",
        "drivers_adicionais": "Certifique-se de ter 'non-free' e 'contrib' no seu sources.list para instalar drivers proprietários.",
        "codecs_multimidia": "sudo apt install libavcodec-extra -y",
        "explicacao_codecs": "Instala codecs extras para suporte multimídia completo.",
        "software_essencial": {
            "navegador": "Firefox ESR (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "Depende do ambiente escolhido (GNOME, KDE, XFCE).",
        "loja_aplicativos": "GNOME Software ou Synaptic."
    },
    {
        "nome": "Linux Mint",
        "base": "Ubuntu/Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "O Mint possui um excelente Gerenciador de Atualizações gráfico, mas o terminal é sempre mais rápido.",
        "drivers_adicionais": "Use o 'Gerenciador de Drivers' do Mint. É um dos melhores do mundo Linux.",
        "codecs_multimidia": "sudo apt install mint-meta-codecs -y",
        "explicacao_codecs": "Instala todos os codecs necessários para uma experiência multimídia completa.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "Cinnamon é o padrão. Explore os 'Applets' e 'Desklets'.",
        "loja_aplicativos": "Gerenciador de Aplicativos do Mint."
    },
    {
        "nome": "Fedora",
        "base": "Independente",
        "gerenciador_pacotes": "DNF",
        "comandos_atualizacao": "sudo dnf upgrade --refresh",
        "explicacao_atualizacao": "O Fedora traz as tecnologias mais recentes. Este comando atualiza tudo.",
        "drivers_adicionais": "Habilite os repositórios RPM Fusion para drivers NVIDIA e multimídia.",
        "codecs_multimidia": "sudo dnf groupinstall multimedia --setop=\"install_weak_deps=False\" --skip-broken",
        "explicacao_codecs": "Instala os grupos de pacotes multimídia do RPM Fusion.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "GNOME puro. Use o 'Ajustes do GNOME' (GNOME Tweaks).",
        "loja_aplicativos": "GNOME Software."
    },
    {
        "nome": "Kali Linux",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt full-upgrade -y",
        "explicacao_atualizacao": "Como é uma distro rolling release, o 'full-upgrade' é essencial.",
        "drivers_adicionais": "Drivers para placas Wi-Fi e GPUs são essenciais para pentest.",
        "codecs_multimidia": "sudo apt install libavcodec-extra -y",
        "explicacao_codecs": "Codecs padrão Debian.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "Geralmente não é o foco, mas pode instalar LibreOffice.",
            "outros": "Burp Suite, Nmap, Metasploit (já vêm)."
        },
        "personalizacao": "XFCE é o padrão. Muito leve e funcional.",
        "loja_aplicativos": "Geralmente via terminal (APT)."
    },
    {
        "nome": "Arch Linux",
        "base": "Independente",
        "gerenciador_pacotes": "Pacman",
        "comandos_atualizacao": "sudo pacman -Syu",
        "explicacao_atualizacao": "Sincroniza e atualiza todo o sistema. Arch é rolling release.",
        "drivers_adicionais": "Instale os pacotes `nvidia` ou `mesa` conforme sua GPU.",
        "codecs_multimidia": "sudo pacman -S gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav",
        "explicacao_codecs": "Plugins GStreamer para suporte total.",
        "software_essencial": {
            "navegador": "Firefox ou Chromium.",
            "office": "LibreOffice.",
            "outros": "Use o AUR (Arch User Repository) para quase tudo."
        },
        "personalizacao": "Você escolhe! KDE, GNOME, i3...",
        "loja_aplicativos": "Pacman (terminal) ou Pamac (GUI)."
    },
    {
        "nome": "Zorin OS",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Mantém seu Zorin estável e seguro.",
        "drivers_adicionais": "Use a ferramenta de drivers do Zorin nas configurações.",
        "codecs_multimidia": "sudo apt install zorin-os-restricted-extras -y",
        "explicacao_codecs": "Codecs multimídia otimizados para o Zorin.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "Zorin Appearance é a ferramenta chave para mudar o visual.",
        "loja_aplicativos": "Zorin Software Store."
    },
    {
        "nome": "Pop!_OS",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt full-upgrade -y",
        "explicacao_atualizacao": "O Pop!_OS recomenda o full-upgrade para melhor compatibilidade.",
        "drivers_adicionais": "Se você baixou a ISO da NVIDIA, os drivers já estão lá!",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Codecs padrão Ubuntu.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "COSMIC Desktop. Explore o Auto-tiling!",
        "loja_aplicativos": "Pop!_Shop."
    }
  ],
  en: [
    {
        "nome": "Ubuntu",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "This command updates the package list and installs the new versions available. Ubuntu is the gateway for many to Linux.",
        "drivers_adicionais": "Go to 'Software & Updates' > 'Additional Drivers'. Ubuntu makes it very easy to install NVIDIA and other proprietary drivers.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Installs codecs for MP3, MP4, and Microsoft fonts.",
        "software_essencial": {
            "navegador": "Firefox (default). For Chrome: download the .deb from the official site.",
            "office": "LibreOffice (default).",
            "outros": "VLC, GIMP, Spotify (via Snap or APT)."
        },
        "personalizacao": "Uses GNOME. Explore GNOME Extensions and appearance settings.",
        "loja_aplicativos": "Ubuntu Software (Snap Store)."
    },
    {
        "nome": "Debian",
        "base": "Independent",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Debian focuses on stability. This command keeps your 'Stable' system secure.",
        "drivers_adicionais": "Make sure you have 'non-free' and 'contrib' in your sources.list to install proprietary drivers.",
        "codecs_multimidia": "sudo apt install libavcodec-extra -y",
        "explicacao_codecs": "Installs extra codecs for full multimedia support.",
        "software_essencial": {
            "navegador": "Firefox ESR (default).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "Depends on the chosen environment (GNOME, KDE, XFCE).",
        "loja_aplicativos": "GNOME Software or Synaptic."
    },
    {
        "nome": "Linux Mint",
        "base": "Ubuntu/Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Mint has an excellent graphical Update Manager, but the terminal is always faster.",
        "drivers_adicionais": "Use Mint's 'Driver Manager'. It's one of the best in the Linux world.",
        "codecs_multimidia": "sudo apt install mint-meta-codecs -y",
        "explicacao_codecs": "Installs all necessary codecs for a full multimedia experience.",
        "software_essencial": {
            "navegador": "Firefox (default).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "Cinnamon is the default. Explore 'Applets' and 'Desklets'.",
        "loja_aplicativos": "Mint Application Manager."
    },
    {
        "nome": "Fedora",
        "base": "Independent",
        "gerenciador_pacotes": "DNF",
        "comandos_atualizacao": "sudo dnf upgrade --refresh",
        "explicacao_atualizacao": "Fedora brings the latest technologies. This command updates everything.",
        "drivers_adicionais": "Enable RPM Fusion repositories for NVIDIA and multimedia drivers.",
        "codecs_multimidia": "sudo dnf groupinstall multimedia --setop=\"install_weak_deps=False\" --skip-broken",
        "explicacao_codecs": "Installs multimedia package groups from RPM Fusion.",
        "software_essencial": {
            "navegador": "Firefox (default).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "Pure GNOME. Use 'GNOME Tweaks'.",
        "loja_aplicativos": "GNOME Software."
    },
    {
        "nome": "Kali Linux",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt full-upgrade -y",
        "explicacao_atualizacao": "As it is a rolling release distro, 'full-upgrade' is essential.",
        "drivers_adicionais": "Drivers for Wi-Fi cards and GPUs are essential for pentesting.",
        "codecs_multimidia": "sudo apt install libavcodec-extra -y",
        "explicacao_codecs": "Standard Debian codecs.",
        "software_essencial": {
            "navegador": "Firefox (default).",
            "office": "Usually not the focus, but you can install LibreOffice.",
            "outros": "Burp Suite, Nmap, Metasploit (already included)."
        },
        "personalizacao": "XFCE is the default. Very light and functional.",
        "loja_aplicativos": "Usually via terminal (APT)."
    },
    {
        "nome": "Arch Linux",
        "base": "Independent",
        "gerenciador_pacotes": "Pacman",
        "comandos_atualizacao": "sudo pacman -Syu",
        "explicacao_atualizacao": "Synchronizes and updates the entire system. Arch is rolling release.",
        "drivers_adicionais": "Install `nvidia` or `mesa` packages according to your GPU.",
        "codecs_multimidia": "sudo pacman -S gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav",
        "explicacao_codecs": "GStreamer plugins for full support.",
        "software_essencial": {
            "navegador": "Firefox or Chromium.",
            "office": "LibreOffice.",
            "outros": "Use the AUR (Arch User Repository) for almost everything."
        },
        "personalizacao": "You choose! KDE, GNOME, i3...",
        "loja_aplicativos": "Pacman (terminal) or Pamac (GUI)."
    },
    {
        "nome": "Zorin OS",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Keeps your Zorin stable and secure.",
        "drivers_adicionais": "Use the Zorin drivers tool in the settings.",
        "codecs_multimidia": "sudo apt install zorin-os-restricted-extras -y",
        "explicacao_codecs": "Multimedia codecs optimized for Zorin.",
        "software_essencial": {
            "navegador": "Firefox (default).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "Zorin Appearance is the key tool to change the look.",
        "loja_aplicativos": "Zorin Software Store."
    },
    {
        "nome": "Pop!_OS",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt full-upgrade -y",
        "explicacao_atualizacao": "Pop!_OS recommends full-upgrade for better compatibility.",
        "drivers_adicionais": "If you downloaded the NVIDIA ISO, the drivers are already there!",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Standard Ubuntu codecs.",
        "software_essencial": {
            "navegador": "Firefox (default).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "COSMIC Desktop. Explore Auto-tiling!",
        "loja_aplicativos": "Pop!_Shop."
    }
  ],
  es: [
    {
        "nome": "Ubuntu",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando actualiza la lista de paquetes e instala las nuevas versiones disponibles. Ubuntu es la puerta de entrada para muchos a Linux.",
        "drivers_adicionais": "Ve a 'Software y actualizaciones' > 'Controladores adicionales'. Ubuntu facilita mucho la instalación de controladores NVIDIA y otros propietarios.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Instala códecs para MP3, MP4 y fuentes de Microsoft.",
        "software_essencial": {
            "navegador": "Firefox (predeterminado). Para Chrome: descarga el .deb del sitio oficial.",
            "office": "LibreOffice (predeterminado).",
            "outros": "VLC, GIMP, Spotify (vía Snap o APT)."
        },
        "personalizacao": "Usa GNOME. Explora las extensiones de GNOME y la configuración de apariencia.",
        "loja_aplicativos": "Ubuntu Software (Snap Store)."
    },
    {
        "nome": "Debian",
        "base": "Independiente",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Debian se centra en la estabilidad. Este comando mantiene seguro su sistema 'Stable'.",
        "drivers_adicionais": "Asegúrese de tener 'non-free' y 'contrib' en su sources.list para instalar controladores propietarios.",
        "codecs_multimidia": "sudo apt install libavcodec-extra -y",
        "explicacao_codecs": "Instala códecs adicionales para un soporte multimedia completo.",
        "software_essencial": {
            "navegador": "Firefox ESR (predeterminado).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "Depende del entorno elegido (GNOME, KDE, XFCE).",
        "loja_aplicativos": "GNOME Software o Synaptic."
    },
    {
        "nome": "Linux Mint",
        "base": "Ubuntu/Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Mint tiene un excelente Administrador de actualizaciones gráfico, pero la terminal siempre es más rápida.",
        "drivers_adicionais": "Use el 'Administrador de controladores' de Mint. Es uno de los mejores del mundo Linux.",
        "codecs_multimidia": "sudo apt install mint-meta-codecs -y",
        "explicacao_codecs": "Instala todos los códecs necesarios para una experiencia multimedia completa.",
        "software_essencial": {
            "navegador": "Firefox (predeterminado).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "Cinnamon es el predeterminado. Explora 'Applets' y 'Desklets'.",
        "loja_aplicativos": "Administrador de aplicaciones de Mint."
    },
    {
        "nome": "Fedora",
        "base": "Independiente",
        "gerenciador_pacotes": "DNF",
        "comandos_atualizacao": "sudo dnf upgrade --refresh",
        "explicacao_atualizacao": "Fedora trae las últimas tecnologías. Este comando actualiza todo.",
        "drivers_adicionais": "Habilite los repositorios RPM Fusion para controladores NVIDIA y multimedia.",
        "codecs_multimidia": "sudo dnf groupinstall multimedia --setop=\"install_weak_deps=False\" --skip-broken",
        "explicacao_codecs": "Instala los grupos de paquetes multimedia de RPM Fusion.",
        "software_essencial": {
            "navegador": "Firefox (predeterminado).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "GNOME puro. Usa 'GNOME Tweaks'.",
        "loja_aplicativos": "GNOME Software."
    },
    {
        "nome": "Kali Linux",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt full-upgrade -y",
        "explicacao_atualizacao": "Al ser una distro de lanzamiento continuo (rolling release), 'full-upgrade' es esencial.",
        "drivers_adicionais": "Los controladores para tarjetas Wi-Fi y GPU son esenciales para el pentesting.",
        "codecs_multimidia": "sudo apt install libavcodec-extra -y",
        "explicacao_codecs": "Códecs estándar de Debian.",
        "software_essencial": {
            "navegador": "Firefox (predeterminado).",
            "office": "Generalmente no es el foco, pero puedes instalar LibreOffice.",
            "outros": "Burp Suite, Nmap, Metasploit (ya incluidos)."
        },
        "personalizacao": "XFCE es el predeterminado. Muy ligero y funcional.",
        "loja_aplicativos": "Generalmente vía terminal (APT)."
    },
    {
        "nome": "Arch Linux",
        "base": "Independiente",
        "gerenciador_pacotes": "Pacman",
        "comandos_atualizacao": "sudo pacman -Syu",
        "explicacao_atualizacao": "Sincroniza y actualiza todo el sistema. Arch es rolling release.",
        "drivers_adicionais": "Instale los paquetes `nvidia` o `mesa` según su GPU.",
        "codecs_multimidia": "sudo pacman -S gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav",
        "explicacao_codecs": "Complementos de GStreamer para soporte total.",
        "software_essencial": {
            "navegador": "Firefox o Chromium.",
            "office": "LibreOffice.",
            "outros": "Usa el AUR (Arch User Repository) para casi todo."
        },
        "personalizacao": "¡Tú eliges! KDE, GNOME, i3...",
        "loja_aplicativos": "Pacman (terminal) o Pamac (GUI)."
    },
    {
        "nome": "Zorin OS",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Mantiene su Zorin estable y seguro.",
        "drivers_adicionais": "Use la herramienta de controladores de Zorin en la configuración.",
        "codecs_multimidia": "sudo apt install zorin-os-restricted-extras -y",
        "explicacao_codecs": "Códecs multimedia optimizados para Zorin.",
        "software_essencial": {
            "navegador": "Firefox (predeterminado).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "Zorin Appearance es la herramienta clave para cambiar el aspecto.",
        "loja_aplicativos": "Zorin Software Store."
    },
    {
        "nome": "Pop!_OS",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt full-upgrade -y",
        "explicacao_atualizacao": "Pop!_OS recomienda full-upgrade para una mejor compatibilidad.",
        "drivers_adicionais": "Si descargaste la ISO de NVIDIA, ¡los controladores ya están allí!",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Códecs estándar de Ubuntu.",
        "software_essencial": {
            "navegador": "Firefox (predeterminado).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "COSMIC Desktop. ¡Explora el Auto-tiling!",
        "loja_aplicativos": "Pop!_Shop."
    }
  ]
};
