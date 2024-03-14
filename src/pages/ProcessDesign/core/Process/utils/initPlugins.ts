import { Process } from '@/pages/ProcessDesign/core/Process'
import { EdgeType } from '@/pages/ProcessDesign/core/Process/processConfig.ts'
import { dndPanelItems } from '@/pages/ProcessDesign/core/Process/utils/dndPanelItems.ts'
import { EdgeData } from '@logicflow/core'

const initPanel = (process: Process): void => {
    /* 初始化面板 */
    process.extension.dndPanel.setPatternItems(dndPanelItems)
}

const graphMenuConfig: Array<{ text: string; callBack: keyof Process }> = [
    {
        text: '清除',
        callBack: 'clearData',
    },
    {
        text: '下载',
        callBack: 'getSnapshot',
    },
    {
        text: '重制视图缩放',
        callBack: 'resetZoom',
    },
    {
        text: '回到原点',
        callBack: 'resetTranslate',
    },
]

const addMenu = (process: Process): void => {
    process.extension.menu.addMenuConfig({
        edgeMenu: [
            {
                text: '设置为曲线',
                callback (edge: EdgeData) {
                    const type = edge.type
                    type !== EdgeType.BEZIER && process.changeEdgeType(edge.id, EdgeType.BEZIER)
                }
            },
            {
                text: '设置为直线',
                callback (edge: EdgeData) {
                    const type = edge.type
                    type !== EdgeType.POLYLINE && process.changeEdgeType(edge.id, EdgeType.POLYLINE)
                }
            },
        ],
        graphMenu: graphMenuConfig.map(m => {
            return {
                text: m.text,
                callback: () => {
                    const callBack = Reflect.get(process, m.callBack) as UndefinedAble<() => void>
                    if (callBack && typeof callBack === 'function') {
                        callBack.call(process)
                    }
                },
            }
        })
    })
}

const addControl = (process: Process, isEdit = true): void => {
    process.extension.control.addItem({
        iconClass: 'custom-icon__export',
        title: '',
        text: '下载',
        onClick: () => {
            process.getSnapshot(`${ process.app.name }.png`, '#fff')
        }
    })

    if (isEdit) {
        process.extension.control.addItem({
            iconClass: 'custom-icon__delete',
            title: '',
            text: '清除内容',
            onClick: () => {
                process.clearData()
            }
        })
    }
}

export const initPreviewPlugins = (process: Process, isEdit = false): void => {
    if (process.app.config.getWriteableConfig.enableSelectionSelect) {
        /* 开启框选 */
        process.extension.selectionSelect.openSelectionSelect()
    }
    addControl(process, isEdit)
}

export const initPlugins = (process: Process): void => {
    initPreviewPlugins(process, true)
    initPanel(process)
    addMenu(process)
}
