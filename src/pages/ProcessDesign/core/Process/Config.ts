import gridSvg from '@/assets/images/grid.svg'
import { Application } from '@/pages/ProcessDesign/core/Application.ts'
import { Process } from '@/pages/ProcessDesign/core/Process'
import { EdgeType } from '@/pages/ProcessDesign/core/Process/processConfig.ts'
import { CreateUUID } from '@/utils'
import * as Options from '@logicflow/core/types/options'

type IConfigUpdate<T> = { value: T, update: (process: Process, value: any) => void }

export interface IConfigProps {
    edgeType: IConfigUpdate<EdgeType>
    /* 是否开启框选 */
    enableSelectionSelect: IConfigUpdate<boolean>
}

type  IWriteableConfig  = {
    [key in keyof IConfigProps]: IConfigProps[key]['value']
}
    
export class Config {
    /* 默认配置 */
    public readonly defaultConfig: Omit<Options.Definition, 'container'> = {
        style: {
            outline: {
                stroke: 'transparent',
                hover: {
                    stroke: 'transparent'
                }
            },
            edgeText: {
                overflowMode: 'autoWrap',
            },
            nodeText: {
                /* XXX：Text节点有个判断 overflowMode !== 'default' 会导致拖拽宽高变为和节点一样，文字拖动会覆盖节点的拖动 */
                overflowMode: 'autoWrap',
                fontSize: '14px'
            }
        },
        background: {
            backgroundImage: `url(${ gridSvg })`,
            backgroundRepeat: 'repeat'
        },
        stopZoomGraph: false, // 禁止缩放
        stopScrollGraph: false, // 禁止鼠标滚动移动画布
        /* 自定义id规则 */
        idGenerator: () => `${ CreateUUID() }`,
    }

    /* 可修改的配置 */
    #writeableConfig: IConfigProps = {
        /* 默认是用 贝塞尔曲线 */
        edgeType: {
            value: EdgeType.POLYLINE,
            update: (process: Process, value: EdgeType) => process.setDefaultEdgeType(value),
        },
        enableSelectionSelect: {
            value: false,
            update: (process: Process, value: boolean) => {
                const selectionSelect = process.extension.selectionSelect
                value ? selectionSelect.openSelectionSelect() : selectionSelect.closeSelectionSelect()
            },
        }
    }

    constructor (private app: Application) {
    }

    #updateConfigByKey<U extends keyof IConfigProps> (key: U, value: IConfigProps[U]['value']): void {
        const target = Reflect.get(this.#writeableConfig, key)
        if (target) {
            Reflect.set(target, 'value', value)
        }
    }

    /* 可修改配置 */
    public get getWriteableConfig (): IWriteableConfig {
        const keys = Reflect.ownKeys(this.#writeableConfig)
        return keys.reduce((result: IWriteableConfig, key) => {
            Reflect.set(result, key, this.#writeableConfig[key as keyof IConfigProps].value)
            return result
        }, {} as IWriteableConfig)
    }

    /* 传递需要修改的值 */
    public update (data: IObj): void {
        const keys = Reflect.ownKeys(data),
            length = keys.length
        for (let i = 0; i < length; ++i) {
            const key = keys[i] as keyof IConfigProps
            const value = Reflect.get(data, key)
            this.#updateConfigByKey(key, value)
            const update = this.#writeableConfig[key]?.update
            if (update && typeof update === 'function') {
                update.call(this, this.app.process, value)
            }
        }
    }
}
