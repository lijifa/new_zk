import { useReactive } from 'ahooks'
import { isNil } from 'lodash'

export type ModalProps<Params = any> = {
  params?: Params
  setVisible?(visible: boolean): void
  ok?(...arg: any): void
  cancel?(...arg: any): void
}

type Visible = { visible: boolean }

export type Dialog<Params = any, Data = any> = Visible & {
  title?: string
  params?: Params
  data?: Data
  loading?: boolean
  ok?(...arg: any): void
  cancel(...arg: any): void
}

type Config = {
  title?: string
  loading?: boolean
}

export function useDialog<Params = any, Data = any>(config?: Config): Dialog<Params, Data> {
  const configg = (config ?? {}) as Config
  
  const dialogData: Dialog<Params, Data> = {
    visible: false,
    cancel() {
      dialog.visible = false
    }
  }

  // 标题
  !isNil(configg.title) && (dialogData.title = configg.title)
  // 加载
  !isNil(configg.loading) && (dialogData.loading = configg.loading)

  // 弹窗对象
  const dialog = useReactive(dialogData)

  return dialog
}

export function openDialog<T extends Visible>(dialog: T, props?: Partial<Omit<T, 'visible'>>) {
  dialog.visible = true
  Object.assign(dialog, props ?? {})
}

export function setVisibler(dialog: Visible) {
  return (visible: boolean) => dialog.visible = visible
}
