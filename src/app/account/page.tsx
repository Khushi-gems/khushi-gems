
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User, ShoppingBag, LogOut, Home, Ticket, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser, useAuth, useFirestore, useMemoFirebase, useDoc, useCollection } from "@/firebase";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, Firestore, setDoc, getDoc, collection, query, orderBy } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import type { Order } from "@/lib/types";
import { countries, indianStates } from "@/lib/data";
import { cn } from "@/lib/utils";
import { LoadingLogo } from "@/components/loading-logo";


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
    </svg>
);

const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  company: z.string().optional(),
  streetAddress: z.string().min(1, "Street address is required."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  pinCode: z.string().min(1, "PIN code is required."),
  country: z.string().min(1, "Country is required."),
  phone: z.string().min(1, "Phone is required."),
});

type AddressFormValues = z.infer<typeof addressSchema>;

function AuthForm({ firestore, setAuthInProgress }: { 
    firestore: Firestore | null;
    setAuthInProgress: (loading: boolean) => void;
}) {
    const auth = useAuth();
    const { toast } = useToast();
    const [loginShowPassword, setLoginShowPassword] = useState(false);
    const [registerShowPassword, setRegisterShowPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
    
    const handleAuthError = (error: any) => {
        let title = "Uh oh! Something went wrong.";
        let description = error.message || "An unknown error occurred.";

        if (error.code === 'auth/network-request-failed') {
            title = "Verification Failed";
            description = "Could not verify your request. Please refresh the page and try again. This may be due to a network issue or an ad-blocker.";
        } else if (error.code === 'auth/quota-exceeded') {
            title = "Login Temporarily Unavailable";
            description = "We're experiencing high traffic. Please try again in a few moments.";
        } else if (error.code === 'auth/email-already-in-use') {
            title = "Registration Failed";
            description = "This email address is already in use. Please log in or use a different email.";
        }
        
        console.error("Auth Error:", error);
        toast({ variant: "destructive", title, description });
    };

    const handleAuthSuccess = async (user: FirebaseUser) => {
        if (!firestore) return;

        try {
            await user.getIdToken(true);
            const userDocRef = doc(firestore, 'users', user.uid);
            
            await setDoc(userDocRef, {
                id: user.uid,
                email: user.email,
                firstName: user.displayName?.split(' ')[0] || '',
                lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
            }, { merge: true });

            toast({ title: "Logged in successfully!" });
        } catch (error: any) {
            console.error("Profile setup failed:", error);
            toast({ variant: "destructive", title: "Setup failed", description: "Could not create your user profile." });
        } finally {
            setAuthInProgress(false);
        }
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth) return;
        setAuthInProgress(true);
        const email = (e.currentTarget.elements.namedItem('register-email') as HTMLInputElement).value;
        const password = (e.currentTarget.elements.namedItem('register-password') as HTMLInputElement).value;
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await handleAuthSuccess(result.user);
        } catch (error: any) {
            handleAuthError(error);
            setAuthInProgress(false);
        }
    }
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth) return;
        setAuthInProgress(true);
        const email = (e.currentTarget.elements.namedItem('login-email') as HTMLInputElement).value;
        const password = (e.currentTarget.elements.namedItem('login-password') as HTMLInputElement).value;
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            await handleAuthSuccess(result.user);
        } catch (error: any) {
             handleAuthError(error);
             setAuthInProgress(false);
        }
    }

    const handleGoogleSignIn = async () => {
        if (!auth) return;
        setAuthInProgress(true);
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            await handleAuthSuccess(result.user);
        } catch (error: any) {
            handleAuthError(error);
            setAuthInProgress(false);
        }
    };
    
    const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth || !resetEmail) return;
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            toast({ title: "Password Reset Email Sent", description: "Please check your inbox for instructions to reset your password." });
            setIsResetDialogOpen(false);
            setResetEmail('');
        } catch (error: any) {
            let title = "Error Sending Reset Email";
            let description = error.message || "An unknown error occurred.";
            if (error.code === 'auth/user-not-found') {
                description = "No account found with this email address.";
            } else if (error.code === 'auth/invalid-email') {
                description = "Please enter a valid email address.";
            }
            toast({ variant: "destructive", title, description });
        }
    };


    return (
        <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {/* Login Form */}
                <div className="w-full max-w-md mx-auto p-8">
                    <h2 className="font-headline text-3xl mb-8 text-center">Login</h2>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <Label htmlFor="login-email">Username or email address</Label>
                            <Input id="login-email" name="login-email" type="email" required className="mt-1"/>
                        </div>
                        <div className="relative">
                            <Label htmlFor="login-password">Password</Label>
                            <Input 
                                id="login-password" 
                                name="login-password"
                                type={loginShowPassword ? "text" : "password"} 
                                required 
                                className="mt-1"
                            />
                            <Button type="button" variant="ghost" size="icon" className="absolute right-1 bottom-1 h-8 w-8 text-muted-foreground hover:bg-transparent" onClick={() => setLoginShowPassword(!loginShowPassword)}>
                                {loginShowPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                            </Button>
                        </div>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember-me" />
                                <Label htmlFor="remember-me" className="font-normal text-sm">Remember me</Label>
                            </div>
                            <DialogTrigger asChild>
                                <Button variant="link" type="button" className="text-sm p-0 h-auto font-normal text-muted-foreground hover:underline">Lost your password?</Button>
                            </DialogTrigger>
                        </div>
                        <Button type="submit" className="w-full">
                            LOG IN
                        </Button>
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-black/10"></div>
                            <span className="flex-shrink mx-4 text-muted-foreground text-sm">OR</span>
                            <div className="flex-grow border-t border-black/10"></div>
                        </div>
                        <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignIn}>
                            <GoogleIcon className="mr-2 h-5 w-5" />
                            Continue with Google
                        </Button>
                    </form>
                </div>
                
                <div className="absolute hidden md:block left-1/2 -translate-x-1/2 top-0 h-full w-px bg-black/10"></div>
                
                {/* Register Form */}
                <div className="w-full max-w-md mx-auto p-8">
                    <h2 className="font-headline text-3xl mb-8 text-center">Register</h2>
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <Label htmlFor="register-email">Email address</Label>
                            <Input id="register-email" name="register-email" type="email" required className="mt-1"/>
                        </div>
                        <div className="relative">
                            <Label htmlFor="register-password">Password</Label>
                            <Input 
                                id="register-password" 
                                name="register-password"
                                type={registerShowPassword ? "text" : "password"} 
                                required 
                                className="mt-1"
                            />
                            <Button type="button" variant="ghost" size="icon" className="absolute right-1 bottom-1 h-8 w-8 text-muted-foreground hover:bg-transparent" onClick={() => setRegisterShowPassword(!registerShowPassword)}>
                                {registerShowPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                            </Button>
                        </div>
                        <div className="pt-2">
                            <p className="text-xs text-muted-foreground">
                                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link href="/privacy-policy" className="underline hover:text-foreground">privacy policy</Link>.
                            </p>
                        </div>
                        <p className="text-xs text-muted-foreground pt-2">
                            This site is protected by reCAPTCHA and the Google
                            {' '}<Link href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> and
                            {' '}<Link href="https://policies.google.com/terms" className="underline" target="_blank" rel="noopener noreferrer">Terms of Service</Link> apply.
                        </p>
                        <Button type="submit" className="w-full">
                            REGISTER
                        </Button>
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-black/10"></div>
                            <span className="flex-shrink mx-4 text-muted-foreground text-sm">OR</span>
                            <div className="flex-grow border-t border-black/10"></div>
                        </div>
                        <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignIn}>
                            <GoogleIcon className="mr-2 h-5 w-5" />
                            Continue with Google
                        </Button>
                    </form>
                </div>
            </div>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset Your Password</DialogTitle>
                    <DialogDescription>
                        Enter your email address and we will send you a link to reset your password.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePasswordReset} className="space-y-4 pt-4">
                    <div>
                        <Label htmlFor="reset-email">Email Address</Label>
                        <Input 
                            id="reset-email" 
                            name="reset-email" 
                            type="email" 
                            required 
                            className="mt-1"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Send Reset Link</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


function DashboardContent({ displayName }: { displayName: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-lg">Hello, <span className="font-semibold">{displayName}</span>!</p>
                <p className="text-muted-foreground">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
            </CardContent>
        </Card>
    )
}

function OrdersContent({ orders, isLoading }: { orders: Order[] | null, isLoading: boolean }) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-2xl">My Orders</CardTitle></CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center items-center h-24">
                        <LoadingLogo size={32} />
                    </div>
                ) : orders && orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                    <div className="flex-grow">
                                        <p className="font-bold text-lg">Order #{order.id.substring(0, 7).toUpperCase()}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Placed on {new Date(order.orderDate.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm flex-shrink-0">
                                        <div>
                                            <p className="text-muted-foreground">Total</p>
                                            <p className="font-semibold">₹{order.totalAmount.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Status</p>
                                            <p className="font-semibold">{order.status || order.orderStatus}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/thank-you?orderId=${order.id}`}>View Details</Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">You have no orders</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            When you place an order, it will appear here.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/">Start Shopping</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

function CouponsContent() {
    return (
        <Card>
            <CardHeader><CardTitle className="text-2xl">My Coupons</CardTitle></CardHeader>
            <CardContent>
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <Ticket className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No coupons available</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        We'll notify you when you receive new coupons.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

function AddressForm({ address, onSave, closeDialog }: { address?: AddressFormValues, onSave: (data: AddressFormValues) => void, closeDialog: () => void }) {
    const form = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: address || {
            firstName: '', lastName: '', company: '', streetAddress: '', city: '', state: '', pinCode: '', country: 'India', phone: ''
        },
    });

    function onSubmit(data: AddressFormValues) {
        onSave(data);
        closeDialog();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => ( <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => ( <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
                <FormField control={form.control} name="company" render={({ field }) => ( <FormItem><FormLabel>Company (optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="streetAddress" render={({ field }) => ( <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="city" render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="state" render={({ field }) => ( <FormItem><FormLabel>State</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a state" /></SelectTrigger></FormControl><SelectContent>{indianStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="pinCode" render={({ field }) => ( <FormItem><FormLabel>PIN Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="country" render={({ field }) => ( <FormItem><FormLabel>Country</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger></FormControl><SelectContent>{countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                    <Button type="submit">Save Address</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

function AddressesContent({ userProfile, onSave }: { userProfile: any, onSave: (data: any) => void }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAddressType, setEditingAddressType] = useState<'billingAddress' | 'shippingAddress' | null>(null);

    const handleEditClick = (type: 'billingAddress' | 'shippingAddress') => {
        setEditingAddressType(type);
        setIsDialogOpen(true);
    };

    const handleSaveAddress = (addressData: AddressFormValues) => {
        if (editingAddressType) {
            onSave({ [editingAddressType]: addressData });
        }
    };
    
    const addressToEdit = editingAddressType ? userProfile?.[editingAddressType] : undefined;

    const AddressBox = ({ address, type }: { address: any, type: 'billing' | 'shipping' }) => {
        if (!address || !address.streetAddress) {
            return (
                <div className="border-2 border-dashed rounded-lg p-4 flex-grow flex flex-col items-center justify-center text-center bg-secondary/30">
                    <p className="text-sm text-muted-foreground">You have not set up this address.</p>
                    <Button variant="link" className="p-0 mt-1 h-auto text-sm" onClick={() => handleEditClick(type === 'billing' ? 'billingAddress' : 'shippingAddress')}>
                        Add address
                    </Button>
                </div>
            );
        }
        return (
             <address className="text-sm border p-4 rounded-lg not-italic flex-grow bg-secondary/30">
                <p className="font-bold text-foreground">{address.firstName} {address.lastName}</p>
                <div className="mt-2 space-y-1 text-muted-foreground">
                    {address.company && <p>{address.company}</p>}
                    <p>{address.streetAddress}</p>
                    <p>{address.city}, {address.state}, {address.pinCode}</p>
                    <p>{address.country}</p>
                    {address.phone && <p className="pt-2">Phone: {address.phone}</p>}
                </div>
            </address>
        )
    };

    return (
        <Card>
            <CardHeader><CardTitle className="text-2xl">My Addresses</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">The following addresses will be used on the checkout page by default.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">Billing Address</h3>
                            <Button variant="link" className="p-0 h-auto text-sm" onClick={() => handleEditClick('billingAddress')}>Edit</Button>
                        </div>
                        <AddressBox address={userProfile?.billingAddress} type='billing' />
                    </div>
                    <div className="flex flex-col">
                         <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">Shipping Address</h3>
                            <Button variant="link" className="p-0 h-auto text-sm" onClick={() => handleEditClick('shippingAddress')}>Edit</Button>
                        </div>
                         <AddressBox address={userProfile?.shippingAddress} type='shipping' />
                    </div>
                </div>
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {addressToEdit ? 'Edit' : 'Add'} {editingAddressType === 'billingAddress' ? 'Billing' : 'Shipping'} Address
                            </DialogTitle>
                        </DialogHeader>
                        <AddressForm address={addressToEdit} onSave={handleSaveAddress} closeDialog={() => setIsDialogOpen(false)} />
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}

function AccountDetailsContent({ user, userProfile, isProfileLoading, onSave }: { user: FirebaseUser, userProfile: any, isProfileLoading: boolean, onSave: (data: { firstName: string, lastName: string }) => void }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (userProfile) {
            setFirstName(userProfile.firstName || '');
            setLastName(userProfile.lastName || '');
        } else if (user) {
            const nameParts = user.displayName?.split(' ') || [];
            setFirstName(nameParts[0] || '');
            setLastName(nameParts.slice(1).join(' ') || '');
        }
    }, [userProfile, user]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave({ firstName, lastName });
    };

    return (
         <Card>
            <CardHeader><CardTitle className="text-2xl">Account Details</CardTitle></CardHeader>
            <CardContent>
            {isProfileLoading ? <LoadingLogo size={24} /> : (
                <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label>First Name</Label>
                            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div>
                            <Label>Last Name</Label>
                            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <Label>Email Address</Label>
                        <Input value={user.email || ''} readOnly disabled />
                    </div>
                    <Separator className="!my-6" />
                    <div>
                        <h3 className="font-semibold text-lg">Password Change</h3>
                        <div className="space-y-4 mt-4">
                            <div>
                                <Label>Current password (leave blank to leave unchanged)</Label>
                                <Input type="password" />
                            </div>
                            <div>
                                <Label>New password (leave blank to leave unchanged)</Label>
                                <Input type="password" />
                            </div>
                            <div>
                                <Label>Confirm new password</Label>
                                <Input type="password" />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="!mt-6">Save Changes</Button>
                </form>
             )}
            </CardContent>
        </Card>
    )
}

function AccountDashboard({ user }: { user: FirebaseUser }) {
    const auth = useAuth();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('dashboard');

    const userDocRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

    const ordersQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return query(collection(firestore, 'users', user.uid, 'orders'), orderBy('orderDate', 'desc'));
    }, [firestore, user]);
    
    const { data: orders, isLoading: areOrdersLoading } = useCollection<Order>(ordersQuery);

    const handleLogout = async () => {
        if (!auth) return;
        await signOut(auth);
        toast({ title: "Logged out successfully." });
    };

    const handleDetailsSave = (data: {firstName: string, lastName: string} | { billingAddress: any } | { shippingAddress: any }) => {
        if (!userDocRef) return;
        
        setDoc(userDocRef, data, { merge: true }).then(() => {
            toast({ title: "Account details saved." });
        }).catch(error => {
            console.error("Failed to save details:", error);
            toast({ variant: "destructive", title: "Save failed", description: "Could not update your account details." });
        });
    };
    
    const displayName = userProfile?.firstName || user.displayName?.split(' ')[0] || 'User';

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'coupons', label: 'Coupons', icon: Ticket },
        { id: 'addresses', label: 'Addresses', icon: Home },
        { id: 'account-details', label: 'Account Details', icon: User },
    ];

    const MobileNav = () => (
        <div className="lg:hidden mb-8">
            <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                    {menuItems.map(item => (
                        <SelectItem key={item.id} value={item.id}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );

    const DesktopNav = () => (
        <nav className="flex flex-col gap-1">
            {menuItems.map(item => (
                <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                        "w-full justify-start gap-3 text-base py-3 px-4",
                        activeTab === item.id
                            ? "bg-accent text-accent-foreground font-semibold"
                            : "text-muted-foreground hover:bg-accent/50"
                    )}
                    onClick={() => setActiveTab(item.id)}
                >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                </Button>
            ))}
            <Separator className="my-2" />
            <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-base py-3 px-4 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
            >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
            </Button>
        </nav>
    );

    return (
        <div className="container mx-auto px-4 py-16 sm:py-24">
             <header className="text-center mb-12">
                <h1 className="font-headline text-3xl sm:text-5xl font-bold">My Account</h1>
                <p className="text-muted-foreground mt-2 text-lg">Welcome back, {displayName}!</p>
            </header>
            
            <MobileNav />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
                <div className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24">
                     <DesktopNav />
                </div>
                <div className="lg:col-span-3">
                     <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'dashboard' && <DashboardContent displayName={displayName} />}
                            {activeTab === 'orders' && <OrdersContent orders={orders} isLoading={areOrdersLoading} />}
                            {activeTab === 'coupons' && <CouponsContent />}
                            {activeTab === 'addresses' && <AddressesContent userProfile={userProfile} onSave={handleDetailsSave} />}
                            {activeTab === 'account-details' && <AccountDetailsContent user={user} userProfile={userProfile} isProfileLoading={isProfileLoading} onSave={handleDetailsSave} />}
                        </motion.div>
                    </AnimatePresence>
                     <div className="lg:hidden mt-8">
                        <Button
                            variant="outline"
                            className="w-full justify-center gap-3 text-destructive hover:text-destructive border-destructive hover:bg-destructive/10"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function AccountPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const [isAuthInProgress, setIsAuthInProgress] = useState(false);
    const [isProfileVerified, setIsProfileVerified] = useState(false);

    useEffect(() => {
        const verifyAndCreateProfile = async () => {
            if (user && firestore) {
                try {
                    const userDocRef = doc(firestore, 'users', user.uid);
                    const snapshot = await getDoc(userDocRef);

                    if (!snapshot.exists()) {
                        await setDoc(userDocRef, {
                            id: user.uid,
                            email: user.email,
                            firstName: user.displayName?.split(' ')[0] || 'User',
                            lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
                        }, { merge: true });
                    }
                    setIsProfileVerified(true);
                } catch (e) {
                    console.error("Profile verification/creation failed", e);
                }
            } else if (!user) {
                setIsProfileVerified(false); // Reset on logout
            }
        };

        verifyAndCreateProfile();
    }, [user, firestore]);

    const isLoading = isUserLoading || isAuthInProgress || (user && !isProfileVerified);

    if (isLoading) {
      return (
        <div className="container mx-auto px-4 py-16 sm:py-24 flex flex-col justify-center items-center min-h-[50vh] gap-4">
          <LoadingLogo size={96} />
          <p className="text-muted-foreground">
            {isAuthInProgress ? 'Setting up profile...' :
             isUserLoading ? 'Loading account...' :
             'Verifying profile...'}
          </p>
        </div>
      );
    }

    if (user && isProfileVerified) {
        return <AccountDashboard user={user} />;
    }

    return (
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <AuthForm firestore={firestore} setAuthInProgress={setIsAuthInProgress} />
      </div>
    );
}
