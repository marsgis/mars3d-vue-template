interface AnyFunc {
  (...args: unknown[]): unknown;
}

interface HandlerInfo {
    handler: AnyFunc;
    once?: boolean;
}
export default class EventEmitter {
    private events: Map<string, HandlerInfo[]> = new Map();
    on (type: string, handler: AnyFunc, once?: boolean): AnyFunc {
      if (!this.events.has(type)) {
        this.events.set(type, [])
      }
      (this.events.get(type) || []).push({
        handler,
        once
      })
      return () => {
        this.off(type, handler)
      }
    }

    once (type: string, handler: AnyFunc): AnyFunc {
      return this.on(type, handler, true)
    }

    emit (type: string, ...args: unknown[]): void {
      let i = 0
      while (i < (this.events.get(type) || []).length) {
        const handlers: HandlerInfo[] = this.events.get(type) || []
        const { handler, once } = handlers[i]
        if (once) {
          handlers.splice(i--, 1)
        }
        i++
        handler(...args)
      }
    }

    off (type?: string, handler?: AnyFunc): void {
      if (!type) return
      if (!handler) {
        this.events.set(type, [])
        return
      }
      this.events.set(type, (this.events.get(type) || []).filter(item => item.handler !== handler))
    }
}
