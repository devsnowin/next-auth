export const userWithoutPassword = (user: any) => {
    return {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
    };
};
