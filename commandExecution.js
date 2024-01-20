function commandExecutedSecondsAgo(command, seconds) {
    const lastUsed = commandUsage.get(command);
    if (lastUsed) {
        const now = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
        const difference = now - lastUsed;
        return difference <= seconds;
    }
    return false;
}