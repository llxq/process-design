import { UseGlobalData } from '@/dataStore/useGlobalData.ts'import Canvas from '@/pages/ProcessDesign/components/Canvas.tsx'import Header from '@/pages/ProcessDesign/components/Header.tsx'import { Application } from '@/pages/ProcessDesign/core/Application.ts'import { useContext, useEffect, useState } from 'react'const PreviewProcess = () => {    const { setShowHeader } = useContext(UseGlobalData)    const [app] = useState(new Application())    useEffect(() => {        setShowHeader(false)    })    return (        <div className="process-design__container base-container flex-column">            <Header app={ app } />            <div className="process-design__content">                <Canvas app={ app } isEdit={ false } />            </div>        </div>    )}export default PreviewProcess