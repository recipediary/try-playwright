import React, { useState, useEffect } from 'react'
import { determineCode } from '../utils'


interface CodeContextContent {
    code: string;
    onChange: (code: string) => void;
    rightPanelMode: boolean;
    onChangeRightPanelMode: (val: boolean) => void;
}

export const CodeContext = React.createContext<CodeContextContent>({
    code: "",
    onChange: () => null,
    rightPanelMode: true,
    onChangeRightPanelMode: () => null,
})

const CodeContextWrapper: React.FunctionComponent = ({ children }) => {
    // keep some value in there due a bug with react-monaco-editor
    const [code, setCode] = useState<string>(" ")
    const [rightPanelMode, setRightPanelMode] = useState(true)
    // determine the code which should be loaded on the application start
    useEffect(() => {
        determineCode(code => setCode(code))
    }, [])
    return (
        <CodeContext.Provider value={{
            code,
            onChange: setCode,
            rightPanelMode,
            onChangeRightPanelMode: setRightPanelMode
        }}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeContextWrapper