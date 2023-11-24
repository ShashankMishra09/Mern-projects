import { AnimatePresence, motion } from "framer-motion";

const AnimationWrapper=({children,initial})=>{
    return(
        <motion.div 
        initial={initial}

        >
            {children}
        </motion.div>
    )
}

export default AnimationWrapper;