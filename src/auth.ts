import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                try {
                    const { default: dbConnect } = await import('@/lib/mongodb');
                    const { default: User } = await import('@/models/User');

                    await dbConnect();
                    const existingUser = await User.findOne({ email: user.email });
                    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
                    const role = adminEmails.includes(user.email || '') ? 'admin' : 'user';

                    if (!existingUser) {
                        await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            role: role,
                        });
                    } else {
                        // Update image if changed
                        let shouldSave = false;
                        if (existingUser.image !== user.image) {
                            existingUser.image = user.image;
                            shouldSave = true;
                        }
                        // Update role if matches admin email and not already admin
                        if (adminEmails.includes(user.email || '') && existingUser.role !== 'admin') {
                            existingUser.role = 'admin';
                            shouldSave = true;
                        }

                        if (shouldSave) {
                            await existingUser.save();
                        }
                    }
                    return true;
                } catch (error) {
                    console.error('Error saving user to MongoDB:', error);
                    return false;
                }
            }
            return true;
        },
        async session({ session }) {
            if (session.user?.email) {
                try {
                    const { default: dbConnect } = await import('@/lib/mongodb');
                    const { default: User } = await import('@/models/User');

                    await dbConnect();
                    const dbUser = await User.findOne({ email: session.user.email });
                    if (dbUser) {
                        // Add role to session
                        session.user.role = dbUser.role;
                    }
                } catch (error) {
                    console.error('Error fetching user for session:', error);
                }
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
});
