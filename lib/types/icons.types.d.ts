import React from 'react';
export declare enum ChonkyIconName {
    loading = "loading",
    dropdown = "dropdown",
    placeholder = "placeholder",
    dndDragging = "dndDragging",
    dndCanDrop = "dndCanDrop",
    dndCannotDrop = "dndCannotDrop",
    openFiles = "openFiles",
    openParentFolder = "openParentFolder",
    copy = "copy",
    paste = "paste",
    share = "share",
    search = "search",
    selectAllFiles = "selectAllFiles",
    clearSelection = "clearSelection",
    sortAsc = "sortAsc",
    sortDesc = "sortDesc",
    toggleOn = "toggleOn",
    toggleOff = "toggleOff",
    list = "list",
    compact = "compact",
    smallThumbnail = "smallThumbnail",
    largeThumbnail = "largeThumbnail",
    folder = "folder",
    folderCreate = "folderCreate",
    folderOpen = "folderOpen",
    folderChainSeparator = "folderChainSeparator",
    download = "download",
    upload = "upload",
    trash = "trash",
    fallbackIcon = "fallbackIcon",
    symlink = "symlink",
    hidden = "hidden",
    file = "file",
    license = "license",
    code = "code",
    config = "config",
    model = "model",
    database = "database",
    text = "text",
    archive = "archive",
    image = "image",
    video = "video",
    info = "info",
    key = "key",
    lock = "lock",
    music = "music",
    terminal = "terminal",
    users = "users",
    linux = "linux",
    ubuntu = "ubuntu",
    windows = "windows",
    rust = "rust",
    python = "python",
    nodejs = "nodejs",
    php = "php",
    git = "git",
    adobe = "adobe",
    pdf = "pdf",
    excel = "excel",
    word = "word",
    flash = "flash"
}
export interface FileIconData {
    icon: ChonkyIconName | string;
    colorCode: number;
}
export interface ChonkyIconProps {
    icon: ChonkyIconName | string;
    spin?: boolean;
    className?: string;
    fixedWidth?: boolean;
    style?: React.CSSProperties;
}
