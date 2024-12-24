export const formatPageTitle = (title, appName) => {
    if (!title) return appName;

    // Split the title by slashes and get the last part
    const pageName = title.split("/").pop();

    // Convert camelCase to space-separated words and handle special characters
    const formattedTitle = pageName
        .replace(/([A-Z])/g, " $1")
        .replace(/[-_]/g, " ")
        .trim();

    // Capitalize first letter of each word
    const finalTitle = formattedTitle
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return `${finalTitle} - ${appName}`;
};