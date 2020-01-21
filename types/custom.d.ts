declare global {
    namespace NodeJS {
        interface Global {
            document: Document
            window: Window
            fetch?: typeof fetch
        }
    }
}
