// ==================== THEME MANAGEMENT ====================
const ThemeManager = {
    init() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (systemPrefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        this.updateToggleIcon();

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
                this.updateToggleIcon();
            }
        });
    },

    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateToggleIcon();
    },

    updateToggleIcon() {
        const btn = document.querySelector('.theme-toggle');
        if (!btn) return;

        const currentTheme = document.documentElement.getAttribute('data-theme');
        btn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
        btn.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
};

// ==================== DATA MANAGEMENT ====================
const DataManager = {
    data: null,

    async load() {
        // Determine correct path based on current page location
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const dataPath = isInPagesFolder ? '../data/software.json' : 'data/software.json';

        try {
            const response = await fetch(dataPath);
            if (!response.ok) {
                throw new Error('Failed to fetch: ' + response.status);
            }
            this.data = await response.json();
            console.log('Data loaded successfully:', this.data.software.length, 'software items');
            return this.data;
        } catch (error) {
            console.error('Failed to load software data:', error);
            // Fallback: embed data directly if fetch fails (for local file:// usage)
            this.loadFallbackData();
            return this.data;
        }
    },

    loadFallbackData() {
        // Embedded fallback data for when JSON fetch fails (local file usage)
        this.data = {
            "metadata": {"site_name": "Rashid Software Zone", "total_software": 48, "total_categories": 12},
            "categories": [
                {"id": "browsers", "name": "Web Browsers", "description": "Fast, secure, and modern internet browsers for Windows", "icon": "🌐", "color": "#4285f4", "software_count": 4},
                {"id": "media-players", "name": "Media Players", "description": "Audio and video playback tools for all formats", "icon": "🎬", "color": "#f48c06", "software_count": 4},
                {"id": "security", "name": "Security Tools", "description": "Antivirus, anti-malware, and system protection software", "icon": "🛡️", "color": "#ef4444", "software_count": 4},
                {"id": "productivity", "name": "Productivity", "description": "Office suites, note-taking, and task management tools", "icon": "⚡", "color": "#10b981", "software_count": 4},
                {"id": "utilities", "name": "System Utilities", "description": "System optimization, cleaning, and management tools", "icon": "🔧", "color": "#06b6d4", "software_count": 4},
                {"id": "development", "name": "Development", "description": "IDEs, code editors, and developer tools", "icon": "💻", "color": "#6366f1", "software_count": 4},
                {"id": "graphics", "name": "Graphics & Design", "description": "Image editors, vector tools, and design software", "icon": "🎨", "color": "#ec4899", "software_count": 4},
                {"id": "compression", "name": "Compression Tools", "description": "File archivers, compressors, and extractors", "icon": "📦", "color": "#2d6a4f", "software_count": 4},
                {"id": "file-sharing", "name": "File Sharing", "description": "Torrent clients and download managers", "icon": "⬇️", "color": "#4fc3f7", "software_count": 4},
                {"id": "communication", "name": "Communication", "description": "Chat apps, email clients, and video conferencing", "icon": "💬", "color": "#8b5cf6", "software_count": 4},
                {"id": "audio", "name": "Audio Tools", "description": "Audio editors, recorders, and music players", "icon": "🎵", "color": "#f59e0b", "software_count": 4},
                {"id": "system-tools", "name": "System Tools", "description": "OS utilities, drivers, and hardware tools", "icon": "⚙️", "color": "#64748b", "software_count": 4}
            ],
            "software": [
                {"id": "chrome", "name": "Google Chrome", "developer": "Google Inc.", "category": "browsers", "version": "126.0.6478.63", "release_date": "2026-07-10", "size": "95.2 MB", "license": "Freeware", "icon": "🌐", "color": "#4285f4", "rating": 4.8, "reviews": "2,450,000", "tags": ["Browser", "Fast", "Secure", "Sync"], "description": "The world's most popular web browser with fast performance, built-in security, and seamless Google integration.", "download_url": "https://dl.google.com/chrome/install/GoogleChromeSetup.exe", "requirements": "Windows 10/11, 4GB RAM, 400MB disk space", "featured": true, "trending": true, "new_release": false},
                {"id": "firefox", "name": "Mozilla Firefox", "developer": "Mozilla Foundation", "category": "browsers", "version": "127.0.1", "release_date": "2026-07-08", "size": "56.8 MB", "license": "Open Source (MPL 2.0)", "icon": "🦊", "color": "#ff7139", "rating": 4.7, "reviews": "1,820,000", "tags": ["Browser", "Privacy", "Open Source", "Customizable"], "description": "A privacy-focused browser with powerful customization options and excellent performance.", "download_url": "https://download.mozilla.org/?product=firefox-latest&os=win64", "requirements": "Windows 10/11, 2GB RAM, 200MB disk space", "featured": true, "trending": true, "new_release": false},
                {"id": "brave", "name": "Brave Browser", "developer": "Brave Software Inc.", "category": "browsers", "version": "1.68.123", "release_date": "2026-07-12", "size": "88.5 MB", "license": "Open Source (MPL 2.0)", "icon": "🦁", "color": "#fb542b", "rating": 4.6, "reviews": "890,000", "tags": ["Browser", "Privacy", "Ad Blocker", "Fast"], "description": "A fast, private browser with built-in ad blocking and rewards system.", "download_url": "https://laptop-updates.brave.com/download/BraveBrowserSetup.exe", "requirements": "Windows 10/11, 4GB RAM, 300MB disk space", "featured": false, "trending": true, "new_release": true},
                {"id": "edge", "name": "Microsoft Edge", "developer": "Microsoft Corporation", "category": "browsers", "version": "126.0.2592.68", "release_date": "2026-07-05", "size": "142.3 MB", "license": "Freeware", "icon": "🌊", "color": "#0078d4", "rating": 4.5, "reviews": "1,200,000", "tags": ["Browser", "Chromium", "Microsoft", "Collections"], "description": "Microsoft's modern browser with built-in productivity features and AI integration.", "download_url": "https://go.microsoft.com/fwlink/?linkid=2109047", "requirements": "Windows 10/11, 4GB RAM, 500MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "vlc", "name": "VLC Media Player", "developer": "VideoLAN", "category": "media-players", "version": "4.0.0-dev", "release_date": "2026-07-14", "size": "42.1 MB", "license": "Open Source (GPL-2.0+)", "icon": "🎬", "color": "#f48c06", "rating": 4.9, "reviews": "3,100,000", "tags": ["Media", "Video", "Audio", "Codec"], "description": "The ultimate media player that plays virtually every format without extra codecs.", "download_url": "https://get.videolan.org/vlc/4.0.0/win64/vlc-4.0.0-win64.exe", "requirements": "Windows 10/11, 2GB RAM, 150MB disk space", "featured": true, "trending": true, "new_release": true},
                {"id": "potplayer", "name": "PotPlayer", "developer": "Kakao Corp", "category": "media-players", "version": "1.7.22077", "release_date": "2026-07-01", "size": "38.5 MB", "license": "Freeware", "icon": "🎥", "color": "#1a1a2e", "rating": 4.7, "reviews": "650,000", "tags": ["Media", "Video", "3D", "Subtitles"], "description": "A powerful multimedia player with extensive codec support and 3D playback.", "download_url": "https://t1.daumcdn.net/potplayer/PotPlayer/Version/Latest/PotPlayerSetup64.exe", "requirements": "Windows 10/11, 2GB RAM, 100MB disk space", "featured": false, "trending": true, "new_release": false},
                {"id": "mpc-hc", "name": "MPC-HC", "developer": "MPC-HC Team", "category": "media-players", "version": "2.3.0", "release_date": "2026-06-28", "size": "18.2 MB", "license": "Open Source (GPL-3.0)", "icon": "🎞️", "color": "#4a5568", "rating": 4.6, "reviews": "420,000", "tags": ["Media", "Lightweight", "Video", "Open Source"], "description": "A lightweight, open-source media player with excellent format support.", "download_url": "https://github.com/clsid2/mpc-hc/releases/download/2.3.0/MPC-HC.2.3.0.x64.exe", "requirements": "Windows 10/11, 1GB RAM, 50MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "gom-player", "name": "GOM Player", "developer": "GOM & Company", "category": "media-players", "version": "2.3.93.5363", "release_date": "2026-07-03", "size": "25.6 MB", "license": "Freeware", "icon": "🎦", "color": "#00a8e8", "rating": 4.4, "reviews": "380,000", "tags": ["Media", "Video", "Codec", "360°"], "description": "A versatile media player with built-in codec finder and 360° video support.", "download_url": "https://cdn.gomlab.com/gretech/player/GOMPLAYERGLOBALSETUP.EXE", "requirements": "Windows 10/11, 2GB RAM, 80MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "malwarebytes", "name": "Malwarebytes", "developer": "Malwarebytes Corporation", "category": "security", "version": "5.1.8.0", "release_date": "2026-07-11", "size": "2.8 MB", "license": "Freemium", "icon": "🛡️", "color": "#ef4444", "rating": 4.7, "reviews": "340,000", "tags": ["Security", "Antivirus", "Malware", "Protection"], "description": "Advanced malware protection with real-time threat detection and removal.", "download_url": "https://downloads.malwarebytes.com/file/mb-windows", "requirements": "Windows 10/11, 2GB RAM, 500MB disk space", "featured": true, "trending": true, "new_release": false},
                {"id": "avast", "name": "Avast Free Antivirus", "developer": "Avast Software", "category": "security", "version": "24.5.6112", "release_date": "2026-07-09", "size": "1.2 MB", "license": "Freeware", "icon": "🦅", "color": "#ff6b00", "rating": 4.5, "reviews": "2,100,000", "tags": ["Security", "Antivirus", "Free", "Real-time"], "description": "Comprehensive free antivirus with Wi-Fi inspector and ransomware shield.", "download_url": "https://www.avast.com/download-thank-you.php?product=AVAST-FREE-ANTIVIRUS", "requirements": "Windows 10/11, 2GB RAM, 2GB disk space", "featured": false, "trending": true, "new_release": false},
                {"id": "bitdefender", "name": "Bitdefender Antivirus Free", "developer": "Bitdefender", "category": "security", "version": "27.0.30.140", "release_date": "2026-07-06", "size": "11.5 MB", "license": "Freeware", "icon": "🔒", "color": "#1e3a8a", "rating": 4.6, "reviews": "780,000", "tags": ["Security", "Antivirus", "Lightweight", "AI"], "description": "Lightweight antivirus with AI-powered threat detection and minimal system impact.", "download_url": "https://download.bitdefender.com/windows/installer/en-us/bitdefender_avfree.exe", "requirements": "Windows 10/11, 2GB RAM, 2.5GB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "glasswire", "name": "GlassWire", "developer": "SecureMix LLC", "category": "security", "version": "3.3.678", "release_date": "2026-07-13", "size": "45.2 MB", "license": "Freemium", "icon": "🔥", "color": "#dc2626", "rating": 4.4, "reviews": "120,000", "tags": ["Security", "Firewall", "Network", "Monitor"], "description": "Beautiful network monitoring tool with built-in firewall and threat detection.", "download_url": "https://download.glasswire.com/GlassWireSetup.exe", "requirements": "Windows 10/11, 2GB RAM, 200MB disk space", "featured": false, "trending": true, "new_release": true},
                {"id": "libreoffice", "name": "LibreOffice", "developer": "The Document Foundation", "category": "productivity", "version": "24.2.4.2", "release_date": "2026-07-07", "size": "332.1 MB", "license": "Open Source (MPL-2.0)", "icon": "📊", "color": "#10b981", "rating": 4.6, "reviews": "1,100,000", "tags": ["Office", "Productivity", "Free", "Documents"], "description": "A powerful, free office suite with word processor, spreadsheet, and presentation tools.", "download_url": "https://download.documentfoundation.org/libreoffice/stable/24.2.4/win/x86_64/LibreOffice_24.2.4_Win_x86-64.msi", "requirements": "Windows 10/11, 4GB RAM, 2.5GB disk space", "featured": true, "trending": false, "new_release": false},
                {"id": "notion", "name": "Notion", "developer": "Notion Labs Inc.", "category": "productivity", "version": "3.8.0", "release_date": "2026-07-12", "size": "78.5 MB", "license": "Freemium", "icon": "📝", "color": "#000000", "rating": 4.8, "reviews": "950,000", "tags": ["Notes", "Productivity", "Wiki", "Collaboration"], "description": "All-in-one workspace for notes, tasks, wikis, and databases.", "download_url": "https://www.notion.so/desktop/windows/download", "requirements": "Windows 10/11, 4GB RAM, 200MB disk space", "featured": false, "trending": true, "new_release": true},
                {"id": "obsidian", "name": "Obsidian", "developer": "Dynalist Inc.", "category": "productivity", "version": "1.6.5", "release_date": "2026-07-10", "size": "85.2 MB", "license": "Freemium", "icon": "🪨", "color": "#7c3aed", "rating": 4.7, "reviews": "320,000", "tags": ["Notes", "Markdown", "Knowledge", "Graph"], "description": "A powerful knowledge base that works on top of local Markdown files.", "download_url": "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.6.5/Obsidian.1.6.5.exe", "requirements": "Windows 10/11, 4GB RAM, 300MB disk space", "featured": false, "trending": true, "new_release": false},
                {"id": "todoist", "name": "Todoist", "developer": "Doist Inc.", "category": "productivity", "version": "9.7.2", "release_date": "2026-07-04", "size": "22.1 MB", "license": "Freemium", "icon": "✅", "color": "#e44332", "rating": 4.5, "reviews": "580,000", "tags": ["Tasks", "Todo", "Productivity", "Sync"], "description": "The world's favorite task manager and to-do list app.", "download_url": "https://todoist.com/windows_app", "requirements": "Windows 10/11, 2GB RAM, 100MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "ccleaner", "name": "CCleaner", "developer": "Piriform Software", "category": "utilities", "version": "6.25.11093", "release_date": "2026-07-08", "size": "32.5 MB", "license": "Freemium", "icon": "🧹", "color": "#06b6d4", "rating": 4.4, "reviews": "1,800,000", "tags": ["Cleaner", "Optimization", "Registry", "Privacy"], "description": "The world's most popular PC cleaner for removing junk files and optimizing performance.", "download_url": "https://download.ccleaner.com/ccsetup.exe", "requirements": "Windows 10/11, 2GB RAM, 100MB disk space", "featured": true, "trending": true, "new_release": false},
                {"id": "revo-uninstaller", "name": "Revo Uninstaller", "developer": "VS Revo Group", "category": "utilities", "version": "2.5.0", "release_date": "2026-07-01", "size": "7.1 MB", "license": "Freemium", "icon": "🗑️", "color": "#f97316", "rating": 4.6, "reviews": "420,000", "tags": ["Uninstaller", "Cleaner", "Registry", "Tools"], "description": "Advanced uninstaller that removes leftover files and registry entries.", "download_url": "https://download.revouninstaller.com/download/revo/uninstaller/revosetup.exe", "requirements": "Windows 10/11, 1GB RAM, 50MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "speccy", "name": "Speccy", "developer": "Piriform Software", "category": "utilities", "version": "1.32.803", "release_date": "2026-06-25", "size": "8.2 MB", "license": "Freeware", "icon": "📊", "color": "#14b8a6", "rating": 4.5, "reviews": "290,000", "tags": ["System Info", "Hardware", "Diagnostics", "Free"], "description": "Fast, lightweight system information tool for your PC.", "download_url": "https://download.ccleaner.com/spsetup.exe", "requirements": "Windows 10/11, 1GB RAM, 20MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "treesize", "name": "TreeSize Free", "developer": "JAM Software", "category": "utilities", "version": "4.7.3", "release_date": "2026-07-11", "size": "8.8 MB", "license": "Freeware", "icon": "🌳", "color": "#22c55e", "rating": 4.6, "reviews": "180,000", "tags": ["Disk Space", "Analyzer", "Storage", "Free"], "description": "Quickly scan your disk and find which folders are taking up the most space.", "download_url": "https://downloads.jam-software.de/treesize_free/TreeSizeFreeSetup.exe", "requirements": "Windows 10/11, 1GB RAM, 30MB disk space", "featured": false, "trending": true, "new_release": true},
                {"id": "vscode", "name": "Visual Studio Code", "developer": "Microsoft", "category": "development", "version": "1.90.2", "release_date": "2026-07-09", "size": "92.5 MB", "license": "Open Source (MIT)", "icon": "💻", "color": "#007acc", "rating": 4.9, "reviews": "5,200,000", "tags": ["Editor", "IDE", "Dev", "Extensions"], "description": "The most popular code editor with IntelliSense, debugging, and Git integration.", "download_url": "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user", "requirements": "Windows 10/11, 4GB RAM, 300MB disk space", "featured": true, "trending": true, "new_release": false},
                {"id": "notepad-plus", "name": "Notepad++", "developer": "Don Ho", "category": "development", "version": "8.6.8", "release_date": "2026-07-05", "size": "5.8 MB", "license": "Open Source (GPL-3.0)", "icon": "📝", "color": "#90e0ef", "rating": 4.6, "reviews": "760,000", "tags": ["Editor", "Text", "Lightweight", "Syntax"], "description": "A free source code editor and Notepad replacement with syntax highlighting.", "download_url": "https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.6.8/npp.8.6.8.Installer.x64.exe", "requirements": "Windows 10/11, 1GB RAM, 50MB disk space", "featured": false, "trending": true, "new_release": false},
                {"id": "sublime-text", "name": "Sublime Text", "developer": "Sublime HQ", "category": "development", "version": "4.0.4169", "release_date": "2026-07-02", "size": "18.5 MB", "license": "Shareware", "icon": "🧡", "color": "#ff9800", "rating": 4.7, "reviews": "890,000", "tags": ["Editor", "Text", "Fast", "Customizable"], "description": "A sophisticated text editor for code, markup, and prose with blazing speed.", "download_url": "https://download.sublimetext.com/sublime_text_build_4169_x64_setup.exe", "requirements": "Windows 10/11, 2GB RAM, 100MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "git", "name": "Git for Windows", "developer": "Git Development Community", "category": "development", "version": "2.45.2", "release_date": "2026-07-06", "size": "56.2 MB", "license": "Open Source (GPL-2.0)", "icon": "🌿", "color": "#f05032", "rating": 4.8, "reviews": "1,500,000", "tags": ["Version Control", "Git", "Dev", "Open Source"], "description": "The world's leading distributed version control system for developers.", "download_url": "https://github.com/git-for-windows/git/releases/download/v2.45.2.windows.1/Git-2.45.2-64-bit.exe", "requirements": "Windows 10/11, 2GB RAM, 200MB disk space", "featured": false, "trending": true, "new_release": false},
                {"id": "gimp", "name": "GIMP", "developer": "GIMP Team", "category": "graphics", "version": "2.10.38", "release_date": "2026-07-03", "size": "298.5 MB", "license": "Open Source (GPL-3.0)", "icon": "🎨", "color": "#ec4899", "rating": 4.5, "reviews": "620,000", "tags": ["Image", "Design", "Free", "Photo"], "description": "A powerful, free image manipulation program for photo retouching and composition.", "download_url": "https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.38-setup.exe", "requirements": "Windows 10/11, 4GB RAM, 1GB disk space", "featured": true, "trending": false, "new_release": false},
                {"id": "inkscape", "name": "Inkscape", "developer": "Inkscape Team", "category": "graphics", "version": "1.3.2", "release_date": "2026-06-30", "size": "156.2 MB", "license": "Open Source (GPL-2.0)", "icon": "✒️", "color": "#000000", "rating": 4.6, "reviews": "340,000", "tags": ["Vector", "SVG", "Design", "Free"], "description": "Professional vector graphics editor for creating illustrations and logos.", "download_url": "https://inkscape.org/release/inkscape-1.3.2/windows/64-bit/exe/dl/", "requirements": "Windows 10/11, 4GB RAM, 500MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "blender", "name": "Blender", "developer": "Blender Foundation", "category": "graphics", "version": "4.1.1", "release_date": "2026-07-12", "size": "312.5 MB", "license": "Open Source (GPL-3.0)", "icon": "🧊", "color": "#e87d0d", "rating": 4.8, "reviews": "780,000", "tags": ["3D", "Animation", "Modeling", "Free"], "description": "The free and open-source 3D creation suite for modeling, animation, and rendering.", "download_url": "https://download.blender.org/release/Blender4.1/blender-4.1.1-windows-x64.msi", "requirements": "Windows 10/11, 8GB RAM, 2GB disk space, GPU recommended", "featured": false, "trending": true, "new_release": true},
                {"id": "paint-net", "name": "Paint.NET", "developer": "dotPDN LLC", "category": "graphics", "version": "5.0.13", "release_date": "2026-07-08", "size": "68.2 MB", "license": "Freeware", "icon": "🖌️", "color": "#3b82f6", "rating": 4.4, "reviews": "520,000", "tags": ["Image", "Editor", "Lightweight", "Free"], "description": "A free image and photo editing software with an intuitive interface.", "download_url": "https://www.dotpdn.com/files/paint.net.5.0.13.win64.x64.install.exe", "requirements": "Windows 10/11, 2GB RAM, 200MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "7zip", "name": "7-Zip", "developer": "Igor Pavlov", "category": "compression", "version": "24.05", "release_date": "2026-07-01", "size": "1.5 MB", "license": "Open Source (LGPL-2.1)", "icon": "📦", "color": "#2d6a4f", "rating": 4.8, "reviews": "890,000", "tags": ["Compression", "Archive", "Free", "High Ratio"], "description": "A file archiver with a high compression ratio and support for many formats.", "download_url": "https://www.7-zip.org/a/7z2405-x64.exe", "requirements": "Windows 10/11, 1GB RAM, 10MB disk space", "featured": true, "trending": true, "new_release": false},
                {"id": "winrar", "name": "WinRAR", "developer": "RARLAB", "category": "compression", "version": "7.01", "release_date": "2026-07-04", "size": "3.5 MB", "license": "Shareware", "icon": "📁", "color": "#3b82f6", "rating": 4.6, "reviews": "1,200,000", "tags": ["Compression", "Archive", "RAR", "ZIP"], "description": "The world's most popular compression tool with RAR and ZIP support.", "download_url": "https://www.rarlab.com/rar/winrar-x64-701.exe", "requirements": "Windows 10/11, 1GB RAM, 10MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "peazip", "name": "PeaZip", "developer": "Giorgio Tani", "category": "compression", "version": "9.7.0", "release_date": "2026-07-10", "size": "12.8 MB", "license": "Open Source (LGPL-3.0)", "icon": "🗜️", "color": "#84cc16", "rating": 4.5, "reviews": "180,000", "tags": ["Compression", "Archive", "Free", "Portable"], "description": "A free file archiver utility with support for 200+ archive formats.", "download_url": "https://github.com/peazip/PeaZip/releases/download/9.7.0/peazip-9.7.0.WINDOWS.exe", "requirements": "Windows 10/11, 1GB RAM, 50MB disk space", "featured": false, "trending": true, "new_release": true},
                {"id": "bandizip", "name": "Bandizip", "developer": "Bandisoft", "category": "compression", "version": "7.36", "release_date": "2026-07-06", "size": "7.2 MB", "license": "Freemium", "icon": "📂", "color": "#0ea5e9", "rating": 4.4, "reviews": "220,000", "tags": ["Compression", "Archive", "Fast", "Unicode"], "description": "A fast, lightweight archiver with Unicode support and high-speed compression.", "download_url": "https://dl.bandisoft.com/bandizip.std/BANDIZIP-SETUP-STD-X64.EXE", "requirements": "Windows 10/11, 1GB RAM, 30MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "qbittorrent", "name": "qBittorrent", "developer": "The qBittorrent Project", "category": "file-sharing", "version": "5.0.0", "release_date": "2026-07-14", "size": "28.5 MB", "license": "Open Source (GPL-2.0)", "icon": "⬇️", "color": "#4fc3f7", "rating": 4.7, "reviews": "420,000", "tags": ["Torrent", "P2P", "Free", "No Ads"], "description": "A free, open-source BitTorrent client with no ads and built-in search.", "download_url": "https://sourceforge.net/projects/qbittorrent/files/qbittorrent-win32/qbittorrent-5.0.0/qbittorrent_5.0.0_x64_setup.exe/download", "requirements": "Windows 10/11, 2GB RAM, 100MB disk space", "featured": true, "trending": true, "new_release": true},
                {"id": "transmission", "name": "Transmission", "developer": "Transmission Project", "category": "file-sharing", "version": "4.0.6", "release_date": "2026-07-02", "size": "15.2 MB", "license": "Open Source (GPL-2.0)", "icon": "🌱", "color": "#22c55e", "rating": 4.5, "reviews": "180,000", "tags": ["Torrent", "P2P", "Lightweight", "Open Source"], "description": "A fast, easy, and free BitTorrent client with a minimal interface.", "download_url": "https://github.com/transmission/transmission/releases/download/4.0.6/transmission-4.0.6-x64.msi", "requirements": "Windows 10/11, 2GB RAM, 50MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "idm", "name": "Internet Download Manager", "developer": "Tonec Inc.", "category": "file-sharing", "version": "6.42.17", "release_date": "2026-07-09", "size": "11.2 MB", "license": "Shareware", "icon": "⚡", "color": "#f59e0b", "rating": 4.8, "reviews": "2,500,000", "tags": ["Download", "Manager", "Fast", "Resume"], "description": "The fastest download accelerator with resume capability and browser integration.", "download_url": "https://download.internetdownloadmanager.com/idman642build17.exe", "requirements": "Windows 10/11, 2GB RAM, 50MB disk space", "featured": false, "trending": true, "new_release": false},
                {"id": "free-download-manager", "name": "Free Download Manager", "developer": "FreeDownloadManager.ORG", "category": "file-sharing", "version": "6.24.0", "release_date": "2026-07-07", "size": "78.5 MB", "license": "Freeware", "icon": "📥", "color": "#6366f1", "rating": 4.6, "reviews": "650,000", "tags": ["Download", "Torrent", "Free", "Resume"], "description": "A powerful, modern download accelerator and organizer for free.", "download_url": "https://dn3.freedownloadmanager.org/6/latest/fdm_x64_setup.exe", "requirements": "Windows 10/11, 2GB RAM, 200MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "discord", "name": "Discord", "developer": "Discord Inc.", "category": "communication", "version": "1.0.9156", "release_date": "2026-07-12", "size": "93.2 MB", "license": "Freeware", "icon": "💬", "color": "#8b5cf6", "rating": 4.5, "reviews": "2,800,000", "tags": ["Chat", "Voice", "Community", "Gaming"], "description": "The most popular voice, video, and text communication platform for communities.", "download_url": "https://discord.com/api/download?platform=win", "requirements": "Windows 10/11, 4GB RAM, 300MB disk space", "featured": true, "trending": true, "new_release": true},
                {"id": "telegram", "name": "Telegram Desktop", "developer": "Telegram FZ-LLC", "category": "communication", "version": "5.2.3", "release_date": "2026-07-10", "size": "45.8 MB", "license": "Freeware", "icon": "✈️", "color": "#0088cc", "rating": 4.7, "reviews": "1,900,000", "tags": ["Chat", "Secure", "Cloud", "Fast"], "description": "A fast, secure messaging app with cloud sync and end-to-end encryption.", "download_url": "https://telegram.org/dl/desktop/win64", "requirements": "Windows 10/11, 2GB RAM, 200MB disk space", "featured": false, "trending": true, "new_release": false},
                {"id": "thunderbird", "name": "Mozilla Thunderbird", "developer": "Mozilla Foundation", "category": "communication", "version": "128.0", "release_date": "2026-07-08", "size": "56.2 MB", "license": "Open Source (MPL-2.0)", "icon": "📧", "color": "#0a84ff", "rating": 4.4, "reviews": "420,000", "tags": ["Email", "Client", "Open Source", "Calendar"], "description": "A free, open-source email client with calendar and address book.", "download_url": "https://download.mozilla.org/?product=thunderbird-128.0-ssl&os=win64&lang=en-US", "requirements": "Windows 10/11, 2GB RAM, 200MB disk space", "featured": false, "trending": false, "new_release": true},
                {"id": "zoom", "name": "Zoom", "developer": "Zoom Video Communications", "category": "communication", "version": "6.1.0", "release_date": "2026-07-05", "size": "102.5 MB", "license": "Freemium", "icon": "📹", "color": "#2d8cff", "rating": 4.3, "reviews": "3,200,000", "tags": ["Video", "Meeting", "Conference", "Screen Share"], "description": "The leading video conferencing platform with HD video and screen sharing.", "download_url": "https://zoom.us/client/latest/ZoomInstallerFull.exe", "requirements": "Windows 10/11, 4GB RAM, 500MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "audacity", "name": "Audacity", "developer": "Audacity Team", "category": "audio", "version": "3.6.1", "release_date": "2026-07-11", "size": "14.8 MB", "license": "Open Source (GPL-2.0)", "icon": "🎵", "color": "#f59e0b", "rating": 4.6, "reviews": "1,400,000", "tags": ["Audio", "Editor", "Recorder", "Free"], "description": "A free, easy-to-use, multi-track audio editor and recorder.", "download_url": "https://github.com/audacity/audacity/releases/download/Audacity-3.6.1/audacity-win-3.6.1-x64.exe", "requirements": "Windows 10/11, 2GB RAM, 100MB disk space", "featured": true, "trending": true, "new_release": true},
                {"id": "foobar2000", "name": "foobar2000", "developer": "Peter Pawlowski", "category": "audio", "version": "2.1.5", "release_date": "2026-07-03", "size": "5.2 MB", "license": "Freeware", "icon": "🎧", "color": "#374151", "rating": 4.7, "reviews": "380,000", "tags": ["Audio", "Player", "Lightweight", "Customizable"], "description": "An advanced audio player with a highly customizable interface and excellent sound quality.", "download_url": "https://www.foobar2000.org/getfile/foobar2000_v2.1.5.exe", "requirements": "Windows 10/11, 1GB RAM, 20MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "lmms", "name": "LMMS", "developer": "LMMS Team", "category": "audio", "version": "1.2.2", "release_date": "2026-06-28", "size": "32.5 MB", "license": "Open Source (GPL-2.0)", "icon": "🎹", "color": "#10b981", "rating": 4.4, "reviews": "120,000", "tags": ["Audio", "Music", "DAW", "Free"], "description": "A free, cross-platform digital audio workstation for music production.", "download_url": "https://github.com/LMMS/lmms/releases/download/v1.2.2/lmms-1.2.2-win64.exe", "requirements": "Windows 10/11, 4GB RAM, 200MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "clementine", "name": "Clementine", "developer": "Clementine Team", "category": "audio", "version": "1.4.0", "release_date": "2026-07-06", "size": "22.1 MB", "license": "Open Source (GPL-3.0)", "icon": "🍊", "color": "#f97316", "rating": 4.3, "reviews": "85,000", "tags": ["Audio", "Player", "Library", "Free"], "description": "A modern music player and library organizer inspired by Amarok.", "download_url": "https://github.com/clementine-player/Clementine/releases/download/1.4.0/ClementineSetup-1.4.0.exe", "requirements": "Windows 10/11, 2GB RAM, 100MB disk space", "featured": false, "trending": true, "new_release": true},
                {"id": "hwinfo", "name": "HWiNFO", "developer": "Martin Malik", "category": "system-tools", "version": "8.06", "release_date": "2026-07-13", "size": "12.5 MB", "license": "Freeware", "icon": "🔍", "color": "#64748b", "rating": 4.7, "reviews": "220,000", "tags": ["Hardware", "Info", "Diagnostics", "Monitor"], "description": "Comprehensive hardware analysis, monitoring, and reporting tool.", "download_url": "https://www.hwinfo.com/files/hwi_806.exe", "requirements": "Windows 10/11, 2GB RAM, 50MB disk space", "featured": true, "trending": true, "new_release": true},
                {"id": "cpu-z", "name": "CPU-Z", "developer": "CPUID", "category": "system-tools", "version": "2.10.0", "release_date": "2026-07-02", "size": "2.1 MB", "license": "Freeware", "icon": "🖥️", "color": "#1e40af", "rating": 4.6, "reviews": "480,000", "tags": ["CPU", "Hardware", "Info", "Diagnostics"], "description": "A freeware system profiler that detects CPU, GPU, motherboard, and RAM information.", "download_url": "https://download.cpuid.com/cpu-z/cpu-z_2.10-en.exe", "requirements": "Windows 10/11, 1GB RAM, 10MB disk space", "featured": false, "trending": false, "new_release": false},
                {"id": "rufus", "name": "Rufus", "developer": "Pete Batard", "category": "system-tools", "version": "4.5.0", "release_date": "2026-07-09", "size": "1.3 MB", "license": "Open Source (GPL-3.0)", "icon": "💿", "color": "#dc2626", "rating": 4.8, "reviews": "1,100,000", "tags": ["USB", "Bootable", "ISO", "Portable"], "description": "Create bootable USB drives from ISO images quickly and reliably.", "download_url": "https://github.com/pbatard/rufus/releases/download/v4.5/rufus-4.5.exe", "requirements": "Windows 10/11, 1GB RAM, 5MB disk space", "featured": false, "trending": true, "new_release": false},
                {"id": "autoruns", "name": "Autoruns", "developer": "Microsoft Sysinternals", "category": "system-tools", "version": "14.11", "release_date": "2026-07-05", "size": "1.8 MB", "license": "Freeware", "icon": "🔧", "color": "#2563eb", "rating": 4.5, "reviews": "150,000", "tags": ["Startup", "Manager", "System", "Microsoft"], "description": "Shows what programs are configured to run during system bootup or login.", "download_url": "https://download.sysinternals.com/files/Autoruns.zip", "requirements": "Windows 10/11, 1GB RAM, 10MB disk space", "featured": false, "trending": false, "new_release": false}
            ]
        };
        console.log('Fallback data loaded with', this.data.software.length, 'software items');
    },

    getSoftwareByCategory(categoryId) {
        if (!this.data) return [];
        return this.data.software.filter(sw => sw.category === categoryId);
    },

    getCategoryById(categoryId) {
        if (!this.data) return null;
        return this.data.categories.find(cat => cat.id === categoryId);
    },

    getTrendingSoftware() {
        if (!this.data) return [];
        return this.data.software.filter(sw => sw.trending);
    },

    getFeaturedSoftware() {
        if (!this.data) return [];
        return this.data.software.filter(sw => sw.featured);
    },

    searchSoftware(query) {
        if (!this.data || !query) return [];
        const lowerQuery = query.toLowerCase();
        return this.data.software.filter(sw => 
            sw.name.toLowerCase().includes(lowerQuery) ||
            sw.developer.toLowerCase().includes(lowerQuery) ||
            sw.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
            sw.description.toLowerCase().includes(lowerQuery)
        );
    },

    getNewReleases() {
        if (!this.data) return [];
        return this.data.software.filter(sw => sw.new_release);
    }
};

// ==================== RENDER FUNCTIONS ====================
const Renderer = {
    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        let stars = '';
        for (let i = 0; i < fullStars; i++) stars += '★';
        if (hasHalf) stars += '½';
        for (let i = fullStars + (hasHalf ? 1 : 0); i < 5; i++) stars += '☆';
        return stars;
    },

    renderTags(tags) {
        return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    },

    renderTrendingCards() {
        const trending = DataManager.getTrendingSoftware();
        const container = document.getElementById('marqueeContainer');
        if (!container) return;

        const cards = trending.map(sw => {
            const badgeType = sw.new_release ? 'new' : (sw.featured ? 'featured' : 'hot');
            const badgeText = sw.new_release ? '✨ New' : (sw.featured ? '⭐ Featured' : '🔥 Hot');

            return `
                <div class="trend-card" onclick="window.location.href='pages/category.html?cat=${sw.category}'">
                    <div class="trend-icon" style="background: ${sw.color}15; color: ${sw.color}">${sw.icon}</div>
                    <div class="trend-info">
                        <h3>${sw.name}</h3>
                        <p>by ${sw.developer}</p>
                        <span class="trend-badge ${badgeType}">${badgeText}</span>
                    </div>
                </div>
            `;
        }).join('');

        // Duplicate for infinite scroll
        container.innerHTML = cards + cards;
    },

    renderCategories() {
        const categories = DataManager.data?.categories || [];
        const grid = document.getElementById('categoriesGrid');
        if (!grid) return;

        grid.innerHTML = categories.map(cat => `
            <a href="pages/category.html?cat=${cat.id}" class="category-card fade-in">
                <div class="category-icon" style="background: ${cat.color}15; color: ${cat.color}">${cat.icon}</div>
                <h3>${cat.name}</h3>
                <p>${cat.description}</p>
                <span class="category-count">📂 ${cat.software_count} Software</span>
            </a>
        `).join('');
    },

    renderSoftwareGrid(containerId, softwareList) {
        const grid = document.getElementById(containerId);
        if (!grid) return;

        if (softwareList.length === 0) {
            grid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1;">
                    <div class="no-results-icon">🔍</div>
                    <h3>No software found</h3>
                    <p>Try adjusting your search terms or browse categories.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = softwareList.map(sw => `
            <div class="software-card fade-in">
                <div class="card-glow"></div>
                <div class="software-header">
                    <div class="software-logo" style="background: ${sw.color}15; color: ${sw.color}">${sw.icon}</div>
                    <div class="software-meta">
                        <h3>${sw.name}</h3>
                        <p class="developer">by ${sw.developer}</p>
                        <span class="version">🏷️ ${sw.version}</span>
                    </div>
                </div>
                <div class="software-rating">
                    <span class="stars">${this.renderStars(sw.rating)}</span>
                    <span class="rating-text">${sw.rating} (${sw.reviews} reviews)</span>
                </div>
                <div class="software-tags">
                    ${this.renderTags(sw.tags)}
                </div>
                <a href="${sw.download_url}" class="download-btn" target="_blank" rel="noopener noreferrer" onclick="trackDownload('${sw.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download Now</span>
                </a>
            </div>
        `).join('');

        // Re-observe new elements
        observeElements();
    },

    renderFeaturedSoftware() {
        const featured = DataManager.getFeaturedSoftware();
        this.renderSoftwareGrid('softwareGrid', featured);
    }
};

// ==================== SEARCH FUNCTIONALITY ====================
const SearchManager = {
    init() {
        const searchInput = document.querySelector('.hero-search input');
        if (!searchInput) return;

        let debounceTimer;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 300);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                clearTimeout(debounceTimer);
                this.handleSearch(e.target.value);
            }
        });
    },

    handleSearch(query) {
        const results = DataManager.searchSoftware(query);

        // Hide regular sections if searching
        const sections = document.querySelectorAll('.trending-section, .categories-section, .software-section');
        const searchResults = document.getElementById('searchResults');

        if (query.trim().length > 0) {
            sections.forEach(s => s.style.display = 'none');
            if (searchResults) {
                searchResults.style.display = 'block';
                searchResults.innerHTML = `
                    <div class="section-header">
                        <h2>🔍 Search Results for "${query}"</h2>
                        <p>${results.length} software found</p>
                        <div class="section-line"></div>
                    </div>
                    <div class="software-grid" id="searchGrid"></div>
                `;
                Renderer.renderSoftwareGrid('searchGrid', results);
            }
        } else {
            sections.forEach(s => s.style.display = '');
            if (searchResults) searchResults.style.display = 'none';
        }
    }
};

// ==================== INTERSECTION OBSERVER ====================
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ==================== NAVBAR SCROLL ====================
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('active');
}

// ==================== POPUP ====================
function closePopup() {
    const popup = document.getElementById('popupNotice');
    if (popup) {
        popup.style.transform = 'translateX(-50%) translateY(150%)';
        popup.style.opacity = '0';
        setTimeout(() => popup.style.display = 'none', 300);
    }
}

// ==================== ACTIVE NAV LINK ====================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ==================== DOWNLOAD TRACKING ====================
function trackDownload(softwareId) {
    // In a real app, this would track downloads
    console.log('Download tracked:', softwareId);
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu) mobileMenu.classList.remove('active');
            }
        });
    });
}

// ==================== NOTIFICATION BAR ====================
function initNotificationBar() {
    const bar = document.getElementById('notificationBar');
    if (!bar) return;

    const newReleases = DataManager.getNewReleases();
    if (newReleases.length > 0) {
        const names = newReleases.slice(0, 2).map(sw => sw.name).join(' & ');
        bar.querySelector('span:nth-child(2)').innerHTML = 
            `<strong>New Software Alert:</strong> ${names} ${newReleases.length > 2 ? 'and more' : ''} are now available!`;
    }
}

// ==================== CATEGORY PAGE ====================
function initCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('cat');

    if (!categoryId || !window.location.pathname.includes('category.html')) return;

    const category = DataManager.getCategoryById(categoryId);
    const software = DataManager.getSoftwareByCategory(categoryId);

    if (category) {
        document.title = `${category.name} - Rashid Software Zone`;

        const heroTitle = document.getElementById('categoryTitle');
        const heroDesc = document.getElementById('categoryDesc');
        const heroIcon = document.getElementById('categoryIcon');

        if (heroTitle) heroTitle.textContent = category.name;
        if (heroDesc) heroDesc.textContent = category.description;
        if (heroIcon) {
            heroIcon.textContent = category.icon;
            heroIcon.style.color = category.color;
        }

        // Update breadcrumb
        const breadcrumb = document.getElementById('categoryBreadcrumb');
        if (breadcrumb) {
            breadcrumb.innerHTML = `
                <a href="../index.html">🏠 Home</a>
                <span>›</span>
                <span>${category.name}</span>
            `;
        }
    }

    Renderer.renderSoftwareGrid('categorySoftwareGrid', software);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize theme
    ThemeManager.init();

    // Load data
    await DataManager.load();

    // Render content
    Renderer.renderTrendingCards();
    Renderer.renderCategories();
    Renderer.renderFeaturedSoftware();

    // Initialize features
    SearchManager.init();
    initSmoothScroll();
    initNotificationBar();
    initCategoryPage();
    observeElements();

    // Event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
    });

    // Theme toggle
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
        ThemeManager.toggle();
    });

    // Close popup on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) mobileMenu.classList.remove('active');
        }
    });
});
