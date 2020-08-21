export const generateTitle = (videoFile) => {
    if (videoFile) {
        return `Internet Video Archive - ${videoFile.replace(/\.[^/.]+$/, "")}`;
    }
    return "Internet Video Archive"
}