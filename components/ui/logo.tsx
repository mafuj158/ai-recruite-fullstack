import Image from 'next/image'
import logo from '@/public/logo.png'
import { cn } from '@/lib/utils'



interface LogoProps {
    wrapperClass?: string
    titleClass?: string
    imageClass?: string
}


const Logo = ({ wrapperClass, titleClass, imageClass }: LogoProps) => {
    return (
        <div className={cn(`flex items-center gap-2 sm:gap-3 cursor-pointer`, wrapperClass)}>
            <div className={cn('size-8 sm:size-10 rounded-full shrink-0 bg-primary-500 flex items-center justify-center', imageClass)}>
                <Image
                    src={logo}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="size-8 sm:size-10 object-contain"
                />
            </div>
            <span className={cn('text-lg sm:text-2xl font-bold text-white tracking-tight', titleClass)}>
                AI Recruit
            </span>
        </div>
    )
}

export default Logo