export const generateTitle = (videoFile) => {
    if (videoFile) {
        return `Internet Video Archive - ${getFriendlyFilename(videoFile.replace(/\.[^/.]+$/, ""))}`;
    }
    return "Internet Video Archive"
}

export const getFriendlyFilename = (filename) => {
    if (filename) {
        return filename.replace(/_/g, " ");
    }
    return filename;
}