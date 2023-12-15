import AnimationWrapper from "../common/page-animation"
import InPageNavigation from "../components/inpage-navigation.component"


const HomePage = () => {
    return(
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
            <div className="w-full">
                <InPageNavigation routes={["home","trending blogs"]} >
               

                </InPageNavigation>

            </div>
            <div>

            </div>

            </section>
        </AnimationWrapper>
    )
}

export default HomePage