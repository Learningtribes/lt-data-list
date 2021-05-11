import React,{useRef, useEffect, useState} from "react";
import PropTypes from 'prop-types'
import "./component.scss"
import LeftIcon from "./chevron-left-solid.svg"
import RightIcon from "./chevron-right-solid.svg"
import UpIcon from './sort-up-solid.svg'
import DownIcon from './sort-down-solid.svg'
import Dropdown from 'lt-react-dropdown'
import { withTranslation } from "react-i18next";
import './i18n'
import {formatFieldName} from './common'


let paginationKey = 0

class Component0 extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            sort:'',
            pageNo:1 //props.pagination.pageNo
        };

        if (props.defaultLanguage){
            const {t, i18n}=this.props
            i18n.changeLanguage(props.defaultLanguage.replace('-','_'));
        }
    }

    resetPage (pageNo = 1) {
        this.setState({pageNo})
        paginationKey++
    }

    firePageChange (pageNo) {
        const {onPageChange} = this.props
        onPageChange && onPageChange(pageNo, this.state.sort)
    }

    getFieldsWithoutKeyField(){
        const {keyField,fields}=this.props
        return fields.filter(f=>f.fieldName && f.fieldName != keyField );
    }

    sortColumn(fieldName){
        let {sort} = this.state
        if (sort.substr(1) == fieldName || sort == fieldName){
            if (sort.startsWith('-')){
                sort = ''
            }else if (sort.startsWith('+')){
                sort = '-'+fieldName
            } else{
                sort = '+'+fieldName
            }
        }else{
            sort = '+'+fieldName
        }
        this.setState({sort}, ()=>{
            const {onSort}=this.props
            onSort && onSort(sort, this.state.pageNo)
        })
    }

    getHeader(){
        const {subFields, useFontAwesome} = this.props;
        const {sort}=this.state
        const fields = this.getFieldsWithoutKeyField()
        const up = useFontAwesome ? <i className="fal fa-caret-up" /> : <UpIcon/>,
            down = useFontAwesome ? <i className="fal fa-caret-down" /> : <DownIcon/>;
        const getSortIcon = (fieldName)=>{
            return (sort.substr(1) == fieldName || sort == fieldName) &&
                (!sort.startsWith('-') ? up : down)
        }
        return (
            <thead>
                <tr>
                    {fields.map(item=>{
                        const {colSpan}=item
                        const defaultRowSpan = subFields && !colSpan ? 2 : null
                        const {name, fieldName ,rowSpan=defaultRowSpan} = item;
                        const keyStr = formatFieldName(fieldName)
                        return <th onClick={this.sortColumn.bind(this, fieldName)} key={keyStr} className={`${colSpan ? 'top-header':keyStr}`} rowSpan={rowSpan} colSpan={subFields && colSpan}>
                            <span>{name}</span>{getSortIcon(fieldName)}
                        </th>
                    })}
                </tr>
                {subFields && subFields.length ? <tr>
                    {subFields.map(item=>{
                        const {name, fieldName, colSpan,rowSpan} = item;
                        const keyStr = formatFieldName(fieldName)
                        return <th onClick={this.sortColumn.bind(this, fieldName)} key={keyStr} rowSpan={rowSpan} colSpan={colSpan}>
                            <span>{name}</span>{getSortIcon(fieldName)}
                        </th>
                    })}
                </tr> : ''}

            </thead>
        )
    }

    getRow(row, index){
        const id = row[this.props.keyField || 'id'];
        const {subFields=[], cellRender} = this.props
        const fields = this.getFieldsWithoutKeyField()
        const DEFAULT_SIGN = '—'
        const getColumns = ()=>{
            return fields.filter(item=>item.colSpan ==null || item.colSpan=='')
                .concat(subFields)
                .map(item=>{
                let cellValue = ''
                const {name, fieldName, className=''} = item;
                const isIncludeFieldName = Object.keys(row).includes(fieldName)
                if (typeof(item.render)=='function'){
                        cellValue = item.render(row[fieldName], row,item)
                }else{
                    if (isIncludeFieldName){
                        cellValue = row[fieldName]
                        cellValue = (cellValue == null || cellValue === '') ? DEFAULT_SIGN : cellValue.toString()
                    }else{
                        cellValue = DEFAULT_SIGN
                    }
                }
                if (cellValue && cellRender) {
                    cellValue = cellRender(cellValue,row, item)
                }
                return (<td key={name + '-' + fieldName} className={`${formatFieldName(fieldName)} ${className} `}>
                    {cellValue || ''}
                </td>)
            })
        }
        return (
            <tr key={id+'-'+index}>
                {fields && fields.length ? getColumns() : ''}
            </tr>
        )
    }

    getBody(){
        const {data, isLoading, message, emptyText='nothing'} = this.props;
        const {}=this.state
        const fields = this.getFieldsWithoutKeyField()
        let row = ''
        if (isLoading){
            row = (<tr><td className="loading-icon-wrapper" colSpan={fields && fields.length}><i className="fa fa-spinner fa-spin"></i></td></tr>)
        }else if(message){
            row = <tr><td className="cell-notification" colSpan={fields && fields.length}>{message}</td></tr>
        }else{
            row = (data.length <= 0)?
                (<tr><td className="cell-notification" colSpan={fields && fields.length}>{emptyText}</td></tr>) :
                data.map((row,index) => {
                    return this.getRow(row, index)
                }
            )
        }
        return (<tbody>{row}</tbody>)
    }

    getFooter(){
        const {totalData, isLoading, subFields} = this.props;
        const fields = this.getFieldsWithoutKeyField()
        const cellRender=item=>{
            const {name,fieldName, colSpan} = item;
            const cellValue = totalData[fieldName]
            return !colSpan && <th key={name+'-'+fieldName} className={cellValue != null ? formatFieldName(fieldName):''}>{(cellValue == null) ? '' : cellValue.toString()}</th>
        }
        return !isLoading && (<tfoot>
            <tr>
                {fields && fields.filter(p=>p!=null).map(cellRender)}
                {subFields && subFields.map(cellRender)}
            </tr>
        </tfoot>)
    }

    render() {
        const {pagination, isLoading, data, message, totalRowsText, defaultLanguage} = this.props;
        const showHeaderAndFooter = !isLoading && !message && (data && data.length>0)
        return (
            <div className={'lt-react-data-list ' + (this.props.className || '') + (isLoading?' loading':'')}>
                <div className="table-wrapper">
                    <table>
                        {showHeaderAndFooter && this.getHeader()}
                        {this.getBody()}
                        {showHeaderAndFooter && this.getFooter()}
                    </table>
                </div>
                {this.props.enableRowsCount && pagination && !isLoading && (
                    <div className="total-rows">{(totalRowsText || 'Total: * rows').replace(
                        '*', defaultLanguage ? Number(pagination['rowsCount']).toLocaleString(defaultLanguage) : pagination['rowsCount']
                    )}</div>
                )}
                {pagination && (
                    <Pagination {...this.props}
                      key={paginationKey}
                      pageNo={this.state.pageNo}
                      onChange={this.firePageChange.bind(this)}
                    />
                )}
            </div>
        );
    }
}

function Pagination (props) {
    const {pageSize = 9999, rowsCount = 0} = props.pagination

    const pageCount = Math.ceil(rowsCount / pageSize)
    const pages = [...Array(pageCount).keys()].splice(1).concat(pageCount || 1).map(p=>({value: p}))
    const { t, useFontAwesome, pageNo: propPageNo } = props

    const [pageNo, setPageNo] = useState(props.pageNo || 0)

    const $dropDown = useRef(null)

    useEffect(() => {
        setPageNo(propPageNo)
    }, [propPageNo])

    const switchPage = (item) => setPageNo(prev => {
        const page = Number(item.value)
        if (props.onChange) props.onChange(page)
        return page
    })

    const goPrevPage = (e) => {
        if (e.currentTarget.classList.contains('disabled')) return

        setPageNo(prev => {
            const page = prev - 1
            if ($dropDown.current) {
                requestAnimationFrame(() => $dropDown.current.select({value: page}))
            }
            return page
        })
    }

    const goNextPage = (e) => {
        if (e.currentTarget.classList.contains('disabled')) return

        setPageNo(prev => {
            const page = prev + 1
            if ($dropDown.current) {
                requestAnimationFrame(() => $dropDown.current.select({value: page}))
            }
            return page
        })
    }

    const Left = (props) => (
        useFontAwesome ? (<i {...{...props, className:`fal fa-chevron-left ${props.className}`}}/>) : (<LeftIcon {...props}/>)
    )
    const Right = (props) => (
        useFontAwesome ? <i {...{...props, className:`fal fa-chevron-right ${props.className}`}}/> : <RightIcon {...props}/>
    )

    return (
        <div className="pagination">
            <Left onClick={goPrevPage} className={"prev-page"+ (pageNo <= 1 ? " disabled" : '')}/>
            <span>{t('Page')}</span>
            <Dropdown ref={$dropDown} data={pages} value={pageNo} onChange={switchPage}/>
            <span>{t('of')} {pageCount}</span>
            <Right onClick={goNextPage} className={'next-page' + (pageNo > pageCount - 1 ? ' disabled' : '')}/>
        </div>
    )
}

const Component = withTranslation(undefined, { withRef: true })(Component0)
export default Component;

Component.propTypes = {
    message:PropTypes.string,
    className:PropTypes.string,
    enableRowsCount:PropTypes.bool,
    defaultLanguage:PropTypes.string,
    keyField:PropTypes.string,
    isLoading: PropTypes.bool,
    emptyText:PropTypes.string,
    totalRowsText:PropTypes.string,
    fields:PropTypes.arrayOf(PropTypes.exact({
        fieldName:PropTypes.string,
        name:PropTypes.string,
        colSpan:PropTypes.number,
        render:PropTypes.func,
        className:PropTypes.string
    })),
    subFields:PropTypes.arrayOf(PropTypes.exact({
        fieldName:PropTypes.string,
        name:PropTypes.string,
        colSpan:PropTypes.number,
        render:PropTypes.func,
        className:PropTypes.string
    })),
    pagination:PropTypes.exact({
        pageSize: PropTypes.number,
        rowsCount: PropTypes.number
    }),
    data:PropTypes.array,
    totalData: PropTypes.object,
    rowsCount: PropTypes.number,
    onPageChange:PropTypes.func,
    onSort:PropTypes.func,
    cellRender:PropTypes.func,
}
