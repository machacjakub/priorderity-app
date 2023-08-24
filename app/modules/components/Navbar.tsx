import LogoutButton from "@/app/modules/components/LogoutButton";
import Link from "next/link";
import {User} from "@supabase/gotrue-js";
import {Nullable} from "fputils";
import {MenuOutlined} from "@ant-design/icons";

interface IProps {
    user?: Nullable<User>;
}

export const Navbar = ( {user}: IProps ) => {
    return (
        <div className="w-full h-16 text-foreground grid grid-cols-3 items-center border-b border-b-foreground/10">
            <div className="max-w-min px-8"><MenuOutlined style={{fontSize: '25px'}}/></div>
            <div className="text-3xl lg:text-4xl w !leading-tight mx-auto max-w-xl text-center">
                Priorderity
            </div>
            <div>
                {user ? (
                    <div className="flex items-center justify-center gap-4">
                        {user.email}
                        <LogoutButton />
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                    >
                        Login
                    </Link>
                )}
            </div>
    </div>
    )
}