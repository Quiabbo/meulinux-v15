export interface PostInstallGuide {
  nome: string;
  base: string;
  gerenciador_pacotes: string;
  comandos_atualizacao: string;
  explicacao_atualizacao: string;
  drivers_adicionais: string;
  codecs_multimidia: string;
  explicacao_codecs: string;
  software_essencial: {
    navegador: string;
    office: string;
    outros: string;
  };
  personalizacao: string;
  loja_aplicativos: string;
}

export const POST_INSTALL_DATA: PostInstallGuide[] = [
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
    },
    {
        "nome": "Edubuntu",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt upgrade). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O Edubuntu, sendo baseado no Ubuntu, geralmente oferece uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema. Você também pode instalar drivers de placa de vídeo NVIDIA/AMD via terminal, se necessário, mas a ferramenta gráfica é mais fácil para iniciantes.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O Edubuntu geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify`"
        },
        "personalizacao": "O Edubuntu usa GNOME (ou Xfce/KDE se você escolheu). Explore as 'Configurações' para mudar temas, ícones, papéis de parede e extensões (para GNOME).",
        "loja_aplicativos": "Use a 'Central de Programas do Ubuntu' para instalar aplicativos de forma gráfica."
    },
    {
        "nome": "Kubuntu",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt upgrade). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "Assim como o Ubuntu, o Kubuntu possui uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema. O KDE Plasma também pode ter notificações sobre drivers ausentes.",
        "codecs_multimidia": "sudo apt install kubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O Kubuntu geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify`"
        },
        "personalizacao": "O Kubuntu usa o KDE Plasma, um ambiente altamente personalizável. Explore as 'Configurações do Sistema' para mudar temas, ícones, widgets, efeitos e muito mais. A loja de 'Novos Temas' dentro das configurações é um ótimo lugar para começar.",
        "loja_aplicativos": "Use a 'Discover' (loja de aplicativos do KDE) para instalar programas de forma gráfica."
    },
    {
        "nome": "Ubuntu Studio",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt upgrade). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O Ubuntu Studio, sendo baseado no Ubuntu, geralmente oferece uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema. É importante para placas de vídeo e interfaces de áudio.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O Ubuntu Studio geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "O Ubuntu Studio já vem com muitos softwares de produção multimídia. Para outros, como Spotify: `snap install spotify`"
        },
        "personalizacao": "O Ubuntu Studio usa Xfce (padrão) ou outros ambientes. As 'Configurações' do Xfce permitem mudar temas, painéis e ícones. Para áudio, verifique as configurações do JACK ou PipeWire.",
        "loja_aplicativos": "Use a 'Central de Programas do Ubuntu' ou 'Discover' (se KDE) para instalar aplicativos de forma gráfica."
    },
    {
        "nome": "Ubuntu Cinnamon",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt upgrade). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O Ubuntu Cinnamon, sendo baseado no Ubuntu, geralmente oferece uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O Ubuntu Cinnamon geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify`"
        },
        "personalizacao": "O Ubuntu Cinnamon usa o ambiente de desktop Cinnamon. Acesse 'Preferências do Sistema' para personalizar temas, applets, desklets e extensões. É um ambiente muito amigável para personalização.",
        "loja_aplicativos": "Use a 'Loja de Software' (Software Manager) para instalar aplicativos de forma gráfica."
    },
    {
        "nome": "Ubuntu Kylin",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt upgrade). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O Ubuntu Kylin, sendo baseado no Ubuntu, geralmente oferece uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O Ubuntu Kylin geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify`"
        },
        "personalizacao": "O Ubuntu Kylin usa o ambiente de desktop UKUI. Explore as 'Configurações do Sistema' para personalizar temas, ícones e o layout do desktop. Ele tem uma estética única, inspirada em sistemas orientais.",
        "loja_aplicativos": "Use a 'Loja de Aplicativos Kylin' para instalar programas de forma gráfica."
    },
    {
        "nome": "Ubuntu MATE",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt upgrade). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O Ubuntu MATE, sendo baseado no Ubuntu, geralmente oferece uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O Ubuntu MATE geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify`"
        },
        "personalizacao": "O Ubuntu MATE usa o ambiente de desktop MATE. Acesse 'Centro de Controle' para personalizar temas, painéis, menus e ícones. É um ambiente clássico e muito configurável.",
        "loja_aplicativos": "Use a 'Loja de Software' (Software Boutique) para instalar aplicativos de forma gráfica."
    },
    {
        "nome": "Ubuntu Unity",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt upgrade). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O Ubuntu Unity, sendo baseado no Ubuntu, geralmente oferece uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O Ubuntu Unity geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify`"
        },
        "personalizacao": "O Ubuntu Unity usa o ambiente de desktop Unity. Acesse 'Configurações do Sistema' para personalizar o lançador, painéis e temas. O Unity tem um fluxo de trabalho único e eficiente.",
        "loja_aplicativos": "Use a 'Central de Programas do Ubuntu' para instalar aplicativos de forma gráfica."
    },
    {
        "nome": "Regata OS",
        "base": "openSUSE (RPM)",
        "gerenciador_pacotes": "Zypper",
        "comandos_atualizacao": "sudo zypper refresh && sudo zypper update -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza os repositórios (zypper refresh) e depois instala as atualizações disponíveis (zypper update). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O Regata OS, baseado em openSUSE, geralmente tem um bom suporte a hardware. Verifique as 'Configurações do Sistema' (KDE Plasma) para opções de drivers. Para NVIDIA, pode ser necessário adicionar repositórios específicos.",
        "codecs_multimidia": "sudo zypper install opi && opi codecs",
        "explicacao_codecs": "Primeiro instala o 'opi' (OpenSUSE Package Installer) e depois o usa para instalar os codecs multimídia restritos.",
        "software_essencial": {
            "navegador": "O Regata OS geralmente vem com Firefox. Para Chrome: `sudo zypper install google-chrome-stable` (após adicionar o repositório do Chrome, se necessário).",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo flatpak install flathub org.onlyoffice.desktopeditors`",
            "outros": "VLC: `sudo zypper install vlc`, GIMP: `sudo zypper install gimp`, Spotify: `sudo flatpak install flathub com.spotify.Client`"
        },
        "personalizacao": "O Regata OS usa o KDE Plasma. É um ambiente extremamente personalizável. Acesse 'Configurações do Sistema' para mudar tudo: temas, ícones, widgets, efeitos, etc.",
        "loja_aplicativos": "Use a 'Discover' (loja de aplicativos do KDE) para instalar programas de forma gráfica."
    },
    {
        "nome": "Tiger OS",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt upgrade). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O Tiger OS, sendo baseado no Ubuntu, geralmente oferece uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O Tiger OS geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify`"
        },
        "personalizacao": "O Tiger OS usa o KDE Plasma. Acesse 'Configurações do Sistema' para personalizar temas, ícones, widgets e efeitos. O KDE Plasma é muito flexível.",
        "loja_aplicativos": "Use a 'Discover' (loja de aplicativos do KDE) para instalar programas de forma gráfica."
    },
    {
        "nome": "Mauna",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt upgrade). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O Mauna, sendo baseado no Ubuntu, geralmente oferece uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O Mauna geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify`"
        },
        "personalizacao": "O Mauna usa o KDE Plasma. Acesse 'Configurações do Sistema' para personalizar temas, ícones, widgets e efeitos. O KDE Plasma é muito flexível.",
        "loja_aplicativos": "Use a 'Discover' (loja de aplicativos do KDE) para instalar programas de forma gráfica."
    },
    {
        "nome": "Steam OS",
        "base": "Arch Linux",
        "gerenciador_pacotes": "Pacman",
        "comandos_atualizacao": "sudo pacman -Syu",
        "explicacao_atualizacao": "Este comando sincroniza os bancos de dados de pacotes (-y) e atualiza todos os pacotes instalados para suas versões mais recentes (-u).",
        "drivers_adicionais": "O Steam OS é otimizado para jogos e hardware específico (Steam Deck). Drivers geralmente são gerenciados automaticamente pelo sistema. Evite instalar drivers manualmente a menos que saiba o que está fazendo.",
        "codecs_multimidia": "sudo pacman -S gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav",
        "explicacao_codecs": "Instala os plugins GStreamer que fornecem suporte para uma ampla gama de formatos multimídia.",
        "software_essencial": {
            "navegador": "O Steam OS vem com um navegador básico. Para Firefox: `sudo pacman -S firefox`. Para Chrome, pode ser necessário usar Flatpak ou Snap: `flatpak install flathub com.google.Chrome`.",
            "office": "LibreOffice: `sudo pacman -S libreoffice`. Para OnlyOffice: `flatpak install flathub org.onlyoffice.desktopeditors`.",
            "outros": "VLC: `sudo pacman -S vlc`, GIMP: `sudo pacman -S gimp`, Spotify: `flatpak install flathub com.spotify.Client`"
        },
        "personalizacao": "O Steam OS usa o KDE Plasma (no modo Desktop). Acesse 'Configurações do Sistema' para personalizar. Lembre-se que o foco principal é a experiência de jogo.",
        "loja_aplicativos": "Use a 'Discover' (loja de aplicativos do KDE) para instalar programas de forma gráfica no modo Desktop."
    },
    {
        "nome": "Endless OS",
        "base": "Debian (OSTree/Flatpak)",
        "gerenciador_pacotes": "OSTree / Flatpak",
        "comandos_atualizacao": "flatpak update && eos-updater-cli update",
        "explicacao_atualizacao": "O Endless OS usa uma abordagem diferente. `flatpak update` atualiza os aplicativos Flatpak. `eos-updater-cli update` verifica e aplica atualizações do sistema base, que são transacionais e seguras.",
        "drivers_adicionais": "O Endless OS gerencia drivers automaticamente. Não é recomendado tentar instalar drivers manualmente, pois o sistema é imutável e baseado em OSTree.",
        "codecs_multimidia": "Codecs geralmente são incluídos nos pacotes Flatpak ou no sistema base. Se faltar algo, procure por um pacote Flatpak específico ou verifique a loja de aplicativos.",
        "explicacao_codecs": "O Endless OS é focado em facilidade e já traz muitos codecs pré-instalados ou integrados aos seus aplicativos Flatpak.",
        "software_essencial": {
            "navegador": "O Endless OS vem com um navegador pré-instalado. Para outros, use a loja de aplicativos (Flatpak). Ex: `flatpak install flathub org.mozilla.Firefox`.",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `flatpak install flathub org.onlyoffice.desktopeditors`.",
            "outros": "Todos os softwares devem ser instalados via Flatpak. VLC: `flatpak install flathub org.videolan.VLC`, GIMP: `flatpak install flathub org.gimp.GIMP`, Spotify: `flatpak install flathub com.spotify.Client`"
        },
        "personalizacao": "O Endless OS usa um ambiente de desktop GNOME modificado. As opções de personalização são mais limitadas para manter a simplicidade. Explore as 'Configurações' para mudar papéis de parede e algumas opções de aparência.",
        "loja_aplicativos": "Use a 'Central de Aplicativos' (App Center) do Endless OS, que é baseada em Flatpak, para instalar todos os programas."
    },
    {
        "nome": "Br OS",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt upgrade). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O Br OS, sendo baseado no Ubuntu, geralmente oferece uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O Br OS geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify`"
        },
        "personalizacao": "O Br OS usa o KDE Plasma. Acesse 'Configurações do Sistema' para personalizar temas, ícones, widgets e efeitos. O KDE Plasma é muito flexível.",
        "loja_aplicativos": "Use a 'Discover' (loja de aplicativos do KDE) para instalar programas de forma gráfica."
    },
    {
        "nome": "Chrome OS Flex",
        "base": "Chromium OS (Gentoo-based)",
        "gerenciador_pacotes": "Automático",
        "comandos_atualizacao": "O Chrome OS Flex gerencia as atualizações do sistema automaticamente em segundo plano. Não há comandos de terminal para atualização do sistema base. Você será notificado quando uma atualização estiver pronta para ser aplicada.",
        "explicacao_atualizacao": "O Chrome OS Flex é um sistema operacional baseado em nuvem, e suas atualizações são automáticas e transacionais, garantindo que o sistema esteja sempre seguro e atualizado sem intervenção manual.",
        "drivers_adicionais": "O Chrome OS Flex gerencia drivers automaticamente. Não há necessidade de instalar drivers manualmente.",
        "codecs_multimidia": "A maioria dos codecs essenciais já vem incluída. Para formatos mais específicos, pode ser necessário usar aplicativos web ou extensões do navegador.",
        "explicacao_codecs": "O Chrome OS Flex é focado na web, então a maioria dos codecs necessários para streaming e navegação já estão integrados ao navegador Chrome.",
        "software_essencial": {
            "navegador": "O Chrome OS Flex é centrado no navegador Google Chrome. Você pode instalar extensões da Chrome Web Store.",
            "office": "Use Google Docs, Sheets, Slides ou outras suítes office baseadas na web. Você também pode instalar aplicativos Android (se compatível) ou Linux (via Crostini).",
            "outros": "Aplicativos são instalados via Google Play Store (se compatível) ou Linux (via Crostini). Ex: `sudo apt install vlc` (no ambiente Linux)."
        },
        "personalizacao": "A personalização no Chrome OS Flex é mais limitada. Você pode mudar o papel de parede, tema do navegador e algumas configurações básicas de aparência.",
        "loja_aplicativos": "Use a Chrome Web Store para extensões e, se compatível, a Google Play Store para aplicativos Android. Para aplicativos Linux, use the terminal Crostini."
    },
    {
        "nome": "Fyde OS",
        "base": "Chromium OS (Gentoo-based)",
        "gerenciador_pacotes": "Automático",
        "comandos_atualizacao": "O Fyde OS, assim como o Chrome OS Flex, gerencia as atualizações do sistema automaticamente em segundo plano. Não há comandos de terminal para atualização do sistema base.",
        "explicacao_atualizacao": "O Fyde OS segue o modelo de atualização transacional do Chromium OS, garantindo um sistema sempre atualizado e seguro sem a necessidade de comandos manuais.",
        "drivers_adicionais": "O Fyde OS gerencia drivers automaticamente. Não há necessidade de instalar drivers manualmente.",
        "codecs_multimidia": "A maioria dos codecs essenciais já vem incluída. Para formatos mais específicos, pode ser necessário usar aplicativos web ou extensões do navegador.",
        "explicacao_codecs": "O Fyde OS, sendo baseado no Chromium OS, já inclui os codecs necessários para a maioria das atividades web e de mídia.",
        "software_essencial": {
            "navegador": "O Fyde OS é centrado no navegador Chromium. Você pode instalar extensões da Chrome Web Store.",
            "office": "Use Google Docs, Sheets, Slides ou outras suítes office baseadas na web. Você também pode instalar aplicativos Android (se compatível) ou Linux (via Crostini).",
            "outros": "Aplicativos são instalados via Google Play Store (se compatível) ou Linux (via Crostini). Ex: `sudo apt install vlc` (no ambiente Linux)."
        },
        "personalizacao": "A personalização no Fyde OS é mais limitada, similar ao Chrome OS Flex. Você pode mudar o papel de parede e algumas configurações básicas de aparência.",
        "loja_aplicativos": "Use a Chrome Web Store para extensões e, se compatível, a Google Play Store para aplicativos Android. Para aplicativos Linux, use o terminal Crostini."
    },
    {
        "nome": "Red Hat",
        "base": "RHEL (RPM)",
        "gerenciador_pacotes": "DNF",
        "comandos_atualizacao": "sudo dnf update -y",
        "explicacao_atualizacao": "Este comando atualiza todos os pacotes instalados para suas versões mais recentes. O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "No Red Hat Enterprise Linux (RHEL), a instalação de drivers proprietários pode ser mais complexa e geralmente envolve a adição de repositórios de terceiros (como o RPM Fusion) ou a obtenção de drivers diretamente do fabricante. Consulte a documentação oficial para seu hardware específico.",
        "codecs_multimidia": "sudo dnf install @multimedia -y",
        "explicacao_codecs": "Instala um grupo de pacotes relacionados a multimídia, incluindo codecs, para reprodução de áudio e vídeo. Pode ser necessário habilitar repositórios como o RPM Fusion Free e Nonfree.",
        "software_essencial": {
            "navegador": "O RHEL geralmente vem com Firefox. Para Chrome: `sudo dnf install google-chrome-stable` (após adicionar o repositório do Chrome, se necessário).",
            "office": "LibreOffice: `sudo dnf install libreoffice`. Para OnlyOffice: `sudo flatpak install flathub org.onlyoffice.desktopeditors`.",
            "outros": "VLC: `sudo dnf install vlc`, GIMP: `sudo dnf install gimp`, Spotify: `sudo flatpak install flathub com.spotify.Client`"
        },
        "personalizacao": "O RHEL usa GNOME (padrão). Acesse 'Configurações' para personalizar temas, ícones e extensões. Para um ambiente de servidor, a personalização é menos relevante.",
        "loja_aplicativos": "Use a 'Software' (GNOME Software) para instalar aplicativos de forma gráfica, ou o terminal com DNF."
    },
    {
        "nome": "Gentoo",
        "base": "Source-based",
        "gerenciador_pacotes": "Portage (Emerge)",
        "comandos_atualizacao": "sudo emerge --sync && sudo emerge -uDNa @world",
        "explicacao_atualizacao": "`emerge --sync` atualiza a árvore do Portage (repositório de pacotes). `emerge -uDNa @world` atualiza todos os pacotes instalados, incluindo dependências e novas versões, reconstruindo-os a partir do código-fonte. Gentoo é para usuários avançados.",
        "drivers_adicionais": "A instalação de drivers no Gentoo é manual e requer conhecimento aprofundado do sistema. Você precisará configurar o kernel e instalar os pacotes de drivers apropriados via `emerge`. Consulte a documentação oficial do Gentoo (Gentoo Wiki) para seu hardware.",
        "codecs_multimidia": "A instalação de codecs é feita via `emerge`. Você precisará habilitar os 'USE flags' corretos para multimídia e depois instalar os pacotes como `ffmpeg`, `gstreamer` plugins, etc.",
        "explicacao_codecs": "No Gentoo, você tem controle total sobre quais codecs instalar, compilando-os com suporte específico através das USE flags.",
        "software_essencial": {
            "navegador": "Firefox: `sudo emerge firefox`. Chrome: `sudo emerge google-chrome`.",
            "office": "LibreOffice: `sudo emerge libreoffice`. OnlyOffice: pode ser mais complexo de instalar em Gentoo, Flatpak pode ser uma alternativa.",
            "outros": "VLC: `sudo emerge vlc`, GIMP: `sudo emerge gimp`, Spotify: `sudo emerge spotify` (ou via Flatpak)."
        },
        "personalizacao": "A personalização no Gentoo é ilimitada, pois você constrói o sistema do zero. Você pode escolher qualquer ambiente de desktop (KDE, GNOME, Xfce, etc.) e personalizá-lo completamente. Isso exige conhecimento avançado.",
        "loja_aplicativos": "Gentoo não possui uma 'loja de aplicativos' gráfica tradicional. A instalação de software é feita via terminal com `emerge`."
    },
    {
        "nome": "Alpine",
        "base": "Alpine Linux",
        "gerenciador_pacotes": "APK",
        "comandos_atualizacao": "sudo apk update && sudo apk upgrade",
        "explicacao_atualizacao": "`apk update` atualiza a lista de pacotes disponíveis e `apk upgrade` instala as novas versões dos pacotes instalados. Alpine é conhecido por ser leve e seguro.",
        "drivers_adicionais": "A instalação de drivers no Alpine Linux é geralmente manual e focada na simplicidade. Para hardware específico, pode ser necessário instalar pacotes de kernel adicionais ou módulos. Consulte a documentação do Alpine.",
        "codecs_multimidia": "sudo apk add ffmpeg gst-plugins-base gst-plugins-good",
        "explicacao_codecs": "Instala pacotes essenciais como FFmpeg e plugins GStreamer para suporte multimídia.",
        "software_essencial": {
            "navegador": "Firefox: `sudo apk add firefox`. Chrome não é facilmente disponível em Alpine devido à sua natureza leve.",
            "office": "LibreOffice: `sudo apk add libreoffice`. Alternativas mais leves podem ser preferíveis.",
            "outros": "VLC: `sudo apk add vlc`, GIMP: `sudo apk add gimp`. Spotify pode ser mais difícil de instalar."
        },
        "personalizacao": "Alpine Linux é minimalista. A personalização depende do ambiente de desktop que você instalar (se instalar um). Geralmente é usado para servidores ou contêineres, onde a personalização gráfica é menos relevante.",
        "loja_aplicativos": "Alpine não possui uma loja de aplicativos gráfica. A instalação de software é feita via terminal com `apk`."
    },
    {
        "nome": "Void",
        "base": "Void Linux",
        "gerenciador_pacotes": "XBPS",
        "comandos_atualizacao": "sudo xbps-install -Syu",
        "explicacao_atualizacao": "Este comando sincroniza os repositórios (`-S`), atualiza a lista de pacotes (`-y`) e instala as atualizações disponíveis (`-u`). Void é uma distro independente e rolling release.",
        "drivers_adicionais": "A instalação de drivers no Void Linux é feita via XBPS. Para placas de vídeo proprietárias (NVIDIA), pode ser necessário instalar pacotes específicos como `nvidia` ou `nvidia-libs-32bit`. Consulte a documentação do Void.",
        "codecs_multimidia": "sudo xbps-install -S ffmpeg gst-plugins-base gst-plugins-good gst-plugins-bad gst-plugins-ugly",
        "explicacao_codecs": "Instala o FFmpeg e os plugins GStreamer para suporte a diversos formatos multimídia.",
        "software_essencial": {
            "navegador": "Firefox: `sudo xbps-install -S firefox`. Chrome: `sudo xbps-install -S google-chrome` (se disponível no repositório).",
            "office": "LibreOffice: `sudo xbps-install -S libreoffice`. OnlyOffice: pode ser mais complexo, Flatpak pode ser uma opção.",
            "outros": "VLC: `sudo xbps-install -S vlc`, GIMP: `sudo xbps-install -S gimp`, Spotify: `sudo xbps-install -S spotify` (ou via Flatpak)."
        },
        "personalizacao": "Void Linux é muito flexível. A personalização depende do ambiente de desktop ou gerenciador de janelas que você instalar (KDE, GNOME, Xfce, i3, etc.). Você tem controle total sobre o sistema.",
        "loja_aplicativos": "Void não possui uma loja de aplicativos gráfica padrão. A instalação de software é feita via terminal com `xbps-install`."
    },
    {
        "nome": "Raspberry Pi OS",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt full-upgrade -y",
        "explicacao_atualizacao": "`apt update` atualiza a lista de pacotes. `apt full-upgrade` é recomendado no Raspberry Pi OS para lidar melhor com mudanças de dependências e remover pacotes obsoletos, garantindo uma atualização completa. O '-y' confirma automaticamente.",
        "drivers_adicionais": "No Raspberry Pi OS, os drivers são geralmente otimizados para o hardware Raspberry Pi e vêm pré-instalados. Não é comum a necessidade de instalar drivers adicionais manualmente.",
        "codecs_multimidia": "sudo apt install libavcodec-extra -y",
        "explicacao_codecs": "Instala codecs adicionais para suporte a uma gama mais ampla de formatos multimídia.",
        "software_essencial": {
            "navegador": "O Raspberry Pi OS vem com Chromium. Para Firefox: `sudo apt install firefox-esr -y`.",
            "office": "LibreOffice já vem pré-instalado.",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify` (se Snap estiver configurado)."
        },
        "personalizacao": "O Raspberry Pi OS usa o ambiente de desktop PIXEL (baseado em LXDE/Openbox). Acesse 'Preferências' para personalizar a aparência, painéis e configurações.",
        "loja_aplicativos": "Use a 'Recommended Software' ou a 'Central de Programas' (se disponível) para instalar aplicativos de forma gráfica."
    },
    {
        "nome": "Black Arch",
        "base": "Arch Linux",
        "gerenciador_pacotes": "Pacman",
        "comandos_atualizacao": "sudo pacman -Syu && sudo blackarch -Syu",
        "explicacao_atualizacao": "`pacman -Syu` atualiza o sistema base Arch. `blackarch -Syu` atualiza as ferramentas específicas do repositório BlackArch. É crucial manter ambos atualizados para ter as últimas ferramentas de segurança.",
        "drivers_adicionais": "No Black Arch, a instalação de drivers é similar ao Arch Linux. Você precisará identificar seu hardware e instalar os pacotes apropriados via `pacman`. Para NVIDIA, `sudo pacman -S nvidia`.",
        "codecs_multimidia": "sudo pacman -S gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav",
        "explicacao_codecs": "Instala os plugins GStreamer que fornecem suporte para uma ampla gama de formatos multimídia.",
        "software_essencial": {
            "navegador": "O Black Arch geralmente vem com Firefox. Para Chrome: `sudo pacman -S google-chrome` (do AUR, pode precisar de um 'AUR helper' como `yay`).",
            "office": "LibreOffice: `sudo pacman -S libreoffice`. OnlyOffice: `flatpak install flathub org.onlyoffice.desktopeditors`.",
            "outros": "VLC: `sudo pacman -S vlc`, GIMP: `sudo pacman -S gimp`, Spotify: `flatpak install flathub com.spotify.Client`"
        },
        "personalizacao": "O Black Arch oferece vários ambientes de desktop/gerenciadores de janelas. A personalização é feita através dos arquivos de configuração de cada ambiente (ex: i3, Openbox, Xfce).",
        "loja_aplicativos": "Black Arch não possui uma loja de aplicativos gráfica padrão. A instalação de software é feita via terminal com `pacman` ou `blackarch`."
    },
    {
        "nome": "BackBox",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt upgrade). O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O BackBox, sendo baseado no Ubuntu, geralmente oferece uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema. Essencial para placas de vídeo e adaptadores Wi-Fi.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O BackBox geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify`"
        },
        "personalizacao": "O BackBox usa o ambiente de desktop Xfce. Acesse 'Configurações' para personalizar temas, painéis e ícones. O Xfce é leve e configurável.",
        "loja_aplicativos": "Use a 'Central de Programas do Ubuntu' ou 'Synaptic Package Manager' para instalar aplicativos de forma gráfica."
    },
    {
        "nome": "Tuxedo OS",
        "base": "Ubuntu (Debian)",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt full-upgrade -y",
        "explicacao_atualizacao": "Este comando primeiro atualiza a lista de pacotes disponíveis (apt update) e depois instala as novas versões dos pacotes já instalados (apt full-upgrade), que é recomendado para lidar com mudanças de dependências no Tuxedo OS. O '-y' confirma automaticamente as instalações.",
        "drivers_adicionais": "O Tuxedo OS é otimizado para hardware TUXEDO Computers e geralmente vem com drivers pré-instalados. Para outros hardwares, ele, sendo baseado no Ubuntu, oferece uma ferramenta gráfica para gerenciar drivers proprietários. Procure por 'Drivers Adicionais' ou 'Software e Atualizações' nas configurações do sistema.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Este pacote instala uma série de codecs e fontes proprietárias essenciais para reprodução de diversos formatos de áudio e vídeo, como MP3, MPEG4, etc.",
        "software_essencial": {
            "navegador": "O Tuxedo OS geralmente vem com Firefox. Para Chrome: `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && sudo apt install -f -y`",
            "office": "LibreOffice já vem pré-instalado. Para OnlyOffice: `sudo snap install onlyoffice-desktopeditors`",
            "outros": "VLC: `sudo apt install vlc -y`, GIMP: `sudo apt install gimp -y`, Spotify: `snap install spotify`"
        },
        "personalizacao": "O Tuxedo OS usa o KDE Plasma. Acesse 'Configurações do Sistema' para personalizar temas, ícones, widgets e efeitos. Ele também possui ferramentas próprias da TUXEDO para gerenciamento de hardware e perfis de energia.",
        "loja_aplicativos": "Use a 'Discover' (loja de aplicativos do KDE) para instalar programas de forma gráfica."
    },
    {
        "nome": "openSUSE",
        "base": "Independente",
        "gerenciador_pacotes": "Zypper",
        "comandos_atualizacao": "sudo zypper refresh && sudo zypper update",
        "explicacao_atualizacao": "O openSUSE usa o Zypper. O comando refresh atualiza os repositórios e o update aplica as atualizações.",
        "drivers_adicionais": "Use o YaST (Yet another Setup Tool) para gerenciar drivers de hardware de forma fácil.",
        "codecs_multimidia": "sudo zypper install opi && opi codecs",
        "explicacao_codecs": "O utilitário 'opi' facilita a instalação de codecs proprietários no openSUSE.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify (via Flatpak)."
        },
        "personalizacao": "KDE Plasma ou GNOME. Use o YaST para configurações profundas do sistema.",
        "loja_aplicativos": "Discover ou GNOME Software."
    },
    {
        "nome": "Manjaro",
        "base": "Arch Linux",
        "gerenciador_pacotes": "Pacman",
        "comandos_atualizacao": "sudo pacman -Syu",
        "explicacao_atualizacao": "O Manjaro é rolling release. Este comando sincroniza os repositórios e atualiza todo o sistema.",
        "drivers_adicionais": "O Manjaro possui o 'Gerenciador de Configurações do Manjaro' para instalar drivers NVIDIA e outros.",
        "codecs_multimidia": "sudo pacman -S gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav",
        "explicacao_codecs": "Instala os plugins GStreamer para suporte multimídia completo.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify (via AUR ou Flatpak)."
        },
        "personalizacao": "Altamente personalizável. Explore as edições oficiais (KDE, GNOME, XFCE).",
        "loja_aplicativos": "Pamac (Adicionar/Remover Programas)."
    },
    {
        "nome": "Deepin",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Atualiza a lista de pacotes e instala as novas versões no ambiente Deepin.",
        "drivers_adicionais": "O Deepin possui um Gerenciador de Drivers integrado no Centro de Controle.",
        "codecs_multimidia": "sudo apt install libavcodec-extra -y",
        "explicacao_codecs": "Codecs extras para suporte multimídia no Deepin.",
        "software_essencial": {
            "navegador": "Navegador Deepin ou Firefox.",
            "office": "WPS Office (frequentemente pré-instalado) ou LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "Deepin Desktop Environment (DDE). Use o Centro de Controle para temas e efeitos.",
        "loja_aplicativos": "Deepin Store."
    },
    {
        "nome": "Xubuntu",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Comandos padrão Ubuntu para manter o sistema XFCE atualizado.",
        "drivers_adicionais": "Vá em 'Configurações' > 'Drivers Adicionais'.",
        "codecs_multimidia": "sudo apt install xubuntu-restricted-extras -y",
        "explicacao_codecs": "Codecs essenciais para o ambiente XFCE do Xubuntu.",
        "software_essencial": {
            "navegador": "Firefox.",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "Ambiente XFCE. Use o 'Gerenciador de Configurações' para temas e painéis.",
        "loja_aplicativos": "Software (GNOME Software)."
    },
    {
        "nome": "Elementary OS",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Mantém o sistema Pantheon atualizado e seguro.",
        "drivers_adicionais": "Verifique o AppCenter para atualizações de drivers de hardware.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Codecs padrão Ubuntu para o elementary OS.",
        "software_essencial": {
            "navegador": "Epiphany (Web) ou instale o Firefox/Chrome.",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify (via AppCenter)."
        },
        "personalizacao": "Ambiente Pantheon. Use as 'Configurações do Sistema' para aparência.",
        "loja_aplicativos": "AppCenter."
    },
    {
        "nome": "MX Linux",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "O MX Linux foca em estabilidade. Use o MX Updater para uma via gráfica.",
        "drivers_adicionais": "Use o 'MX Installer' ou 'MX Tools' para gerenciar drivers NVIDIA e outros.",
        "codecs_multimidia": "sudo apt install mx-codecs -y",
        "explicacao_codecs": "Instala os codecs necessários através das ferramentas do MX.",
        "software_essencial": {
            "navegador": "Firefox.",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "XFCE (padrão). Use o 'MX Tweak' para personalizações rápidas.",
        "loja_aplicativos": "MX Package Installer."
    },
    {
        "nome": "Slackware",
        "base": "Independente",
        "gerenciador_pacotes": "pkgtools",
        "comandos_atualizacao": "slackpkg update && slackpkg upgrade-all",
        "explicacao_atualizacao": "O Slackware usa o slackpkg para gerenciar atualizações de pacotes oficiais.",
        "drivers_adicionais": "Geralmente requer compilação manual ou uso de scripts do SlackBuilds.org.",
        "codecs_multimidia": "Instale via SlackBuilds.org (pacotes como ffmpeg, gst-plugins).",
        "explicacao_codecs": "O Slackware preza pela simplicidade e requer que o usuário instale codecs extras manualmente.",
        "software_essencial": {
            "navegador": "Firefox (incluído).",
            "office": "LibreOffice (disponível no SlackBuilds).",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "KDE Plasma ou XFCE. Edite os arquivos de configuração para controle total.",
        "loja_aplicativos": "Terminal (pkgtools / slackpkg)."
    },
    {
        "nome": "Bodhi Linux",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Mantém o ambiente Moksha leve e atualizado.",
        "drivers_adicionais": "Vá em 'Configurações' > 'Drivers Adicionais' (mesma base Ubuntu).",
        "codecs_multimidia": "sudo apt install bodhi-restricted-extras -y",
        "explicacao_codecs": "Codecs otimizados para a leveza do Bodhi.",
        "software_essencial": {
            "navegador": "Chromium ou Firefox.",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "Ambiente Moksha. Explore os temas e módulos exclusivos do Bodhi.",
        "loja_aplicativos": "AppCenter (via web) ou Terminology."
    },
    {
        "nome": "Big Linux",
        "base": "Manjaro",
        "gerenciador_pacotes": "Pacman",
        "comandos_atualizacao": "sudo pacman -Syu",
        "explicacao_atualizacao": "O Big Linux usa a base Manjaro. Este comando atualiza todo o sistema brasileiro.",
        "drivers_adicionais": "Use a 'Central de Controle do Big Linux' para gerenciar drivers e hardware.",
        "codecs_multimidia": "sudo pacman -S gst-plugins-good gst-plugins-bad gst-plugins-ugly",
        "explicacao_codecs": "Codecs multimídia para o KDE Plasma do Big Linux.",
        "software_essencial": {
            "navegador": "Firefox ou Brave.",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify (via Big Store)."
        },
        "personalizacao": "KDE Plasma. Use os 'Web Apps' e temas exclusivos do Big Linux.",
        "loja_aplicativos": "Big Store."
    },
    {
        "nome": "Lubuntu",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Mantém o sistema LXQt leve e rápido.",
        "drivers_adicionais": "Vá em 'Preferências' > 'Drivers Adicionais'.",
        "codecs_multimidia": "sudo apt install lubuntu-restricted-extras -y",
        "explicacao_codecs": "Codecs essenciais para o ambiente LXQt.",
        "software_essencial": {
            "navegador": "Firefox.",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "Ambiente LXQt. Use as 'Configurações do LXQt' para temas e ícones.",
        "loja_aplicativos": "Discover."
    },
    {
        "nome": "Linux Lite",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "O Linux Lite possui uma ferramenta própria de atualização, mas o terminal funciona perfeitamente.",
        "drivers_adicionais": "Use o 'Lite Software' ou as configurações de drivers do Ubuntu.",
        "codecs_multimidia": "sudo apt install linux-lite-restricted-extras -y",
        "explicacao_codecs": "Codecs para garantir que tudo funcione no seu Linux Lite.",
        "software_essencial": {
            "navegador": "Firefox.",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "XFCE. Use o 'Lite Tweaks' para otimizações e personalização.",
        "loja_aplicativos": "Lite Software."
    },
    {
        "nome": "SparkyLinux",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "O SparkyLinux oferece versões estáveis e rolling. Este comando atualiza ambas.",
        "drivers_adicionais": "Use o 'Sparky APTus' para gerenciar drivers e repositórios.",
        "codecs_multimidia": "sudo apt install sparky-codecs -y",
        "explicacao_codecs": "Instala codecs multimídia através das ferramentas Sparky.",
        "software_essencial": {
            "navegador": "Firefox.",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "Vários ambientes (LXQt, XFCE, KDE). Use o APTus para customização.",
        "loja_aplicativos": "Sparky APTus AppCenter."
    },
    {
        "nome": "Mageia",
        "base": "Independente",
        "gerenciador_pacotes": "DNF",
        "comandos_atualizacao": "sudo dnf upgrade",
        "explicacao_atualizacao": "A Mageia usa o DNF (e anteriormente o urpmi) para gerenciar pacotes.",
        "drivers_adicionais": "Use o 'Mageia Control Center' (MCC) para configurar hardware e drivers.",
        "codecs_multimidia": "sudo dnf install @multimedia",
        "explicacao_codecs": "Instala o grupo de pacotes multimídia da Mageia.",
        "software_essencial": {
            "navegador": "Firefox.",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "KDE Plasma ou GNOME. O MCC é a ferramenta central de personalização.",
        "loja_aplicativos": "Mageia Control Center (Gerenciar Software)."
    },
    {
        "nome": "Tails",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "O Tails é atualizado automaticamente ao iniciar, se houver conexão.",
        "explicacao_atualizacao": "Por segurança e anonimato, o Tails gerencia suas próprias atualizações de forma persistente.",
        "drivers_adicionais": "Drivers são incluídos para maximizar compatibilidade sem comprometer a segurança.",
        "codecs_multimidia": "Incluídos por padrão para os formatos mais comuns.",
        "explicacao_codecs": "O Tails já vem pronto para uso seguro e privado.",
        "software_essencial": {
            "navegador": "Tor Browser (padrão).",
            "office": "LibreOffice.",
            "outros": "KeePassXC, Thunderbird, OnionShare."
        },
        "personalizacao": "GNOME (modo amnésico). Personalização é limitada para evitar 'fingerprinting'.",
        "loja_aplicativos": "Não recomendado instalar software adicional (use o que vem incluído)."
    },
    {
        "nome": "Parrot OS",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo parrot-upgrade",
        "explicacao_atualizacao": "O Parrot possui um script próprio para garantir que todas as ferramentas de segurança sejam atualizadas.",
        "drivers_adicionais": "Use o Centro de Controle do MATE ou KDE para drivers proprietários.",
        "codecs_multimidia": "sudo apt install parrot-codecs -y",
        "explicacao_codecs": "Codecs para suporte multimídia no seu sistema de segurança.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, ferramentas de hacking (Metasploit, Nmap)."
        },
        "personalizacao": "MATE ou KDE Plasma. Use o Centro de Controle para temas.",
        "loja_aplicativos": "Parrot Menu / Terminal."
    },
    {
        "nome": "Solus OS",
        "base": "Independente",
        "gerenciador_pacotes": "eopkg",
        "comandos_atualizacao": "sudo eopkg upgrade",
        "explicacao_atualizacao": "O Solus usa o eopkg. Este comando atualiza todo o sistema de forma eficiente.",
        "drivers_adicionais": "Use o 'DoFlicky' (Hardware Drivers) para instalar drivers NVIDIA e outros.",
        "codecs_multimidia": "sudo eopkg install-bundle multimedia",
        "explicacao_codecs": "Instala o conjunto completo de codecs multimídia do Solus.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "Ambiente Budgie. Use o 'Budgie Desktop Settings' para uma experiência elegante.",
        "loja_aplicativos": "Software Center."
    }
];
