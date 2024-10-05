import {copyToClipboard} from '@acrool/js-utils/dom';
import {TOption} from '@acrool/react-dropdown';
import {Col, Container, Flex, media, Row} from '@acrool/react-grid';

import {animation, createModal, createStateModal, useModal} from '@acrool/react-modal';

import React, {useCallback, useRef} from 'react';
import styled from 'styled-components';
import {Skeleton} from '@acrool/react-skeleton';

// import A from '@/components/atoms/A';
// import {HotKeyWrapper} from '@/components/atoms/HotKey';
// import Loader from '@/components/atoms/Loader';
// import MetaTitle from '@/components/atoms/MetaTitle';
// import {DateRangeField} from '@/components/forms/DateField';
// import IconSwitchField from '@/components/forms/IconSwitchField';
// import ProgressRateField from '@/components/forms/ProgressRateField';
// import Select2 from '@/components/forms/Select2';
// import SelectNumberKeyboard from '@/components/forms/SelectNumberKeyboard';
// import TextPickerField from '@/components/forms/TextPickerField';
// import CopyUrlButton from '@/components/organize/CopyUrlButton';
// import {checkMobileSize} from '@/components/organize/DeviceReloadNotice/utils';
import {ModalLayout} from '../../components/organize/ModalLayout';
// import NoDataWrapper from '@/components/organize/NoDataWrapper';
// import {AttachedFiles, ContentEditor} from '@/components/organize/TaskModal';
// import Comments, {CommentAdd} from '@/components/organize/TaskModal/Comments';
// import QueueFileUploadProvider from '@/components/organize/TaskModal/QueueFileUploadProvider';
// import StatusRibbon from '@/components/organize/TaskModal/StatusRibbon';
// import TitleEditor from '@/components/organize/TaskModal/TitleEditor';
// import {useTaskCategoryList, useTaskDeviceList, useTaskPriorityList, useTaskStatusList} from '@/config/task';
// import {useTaskQuery, useTeamMembersQuery,} from '@/library/graphql/__generated__';
// import {ScreenState} from '@/utils/screen';
// import TaskArchiveButton from '@/views/ViewModal/TaskEditModal/_components/Actions/TaskArchiveButton';
// import TaskDeleteButton from '@/views/ViewModal/TaskEditModal/_components/Actions/TaskDeleteButton';
// import TaskJoinProjectButton from '@/views/ViewModal/TaskEditModal/_components/Actions/TaskJoinProjectButton';
// import RecordWorkTimeButton from '@/views/ViewModal/TaskEditModal/_components/RecordWorkTimeButton';
// import ReleaseVersionProvider, {ReleaseVersionContext} from '@/views/ViewModal/TaskEditModal/_viewModel/ReleaseVersionProvider';
//
// import {TaskCloneButton, TaskMoveButton} from './_components/Actions';
// import TaskTransferButton from './_components/Actions/TaskTransferButton';
// import DoneWorkTimeEdit from './_components/DoneWorkTimeEdit';
// import AssignDeveloperProvider, {AssignDeveloperContext} from './_viewModel/AssignDeveloperProvider';
// import AssignMergerProvider, {AssignMergerContext} from './_viewModel/AssignMergerProvider';
// import AssignTesterProvider, {AssignTesterContext} from './_viewModel/AssignTesterProvider';
// import AttachedFilesProvider, {AttachedFilesContext} from './_viewModel/AttachedFilesProvider';
// import CategoryProvider, {CategoryContext} from './_viewModel/CategoryProvider';
// import CommentAddProvider, {CommentAddContext} from './_viewModel/CommentAddProvider';
// import CommentsProvider, {CommentsContext} from './_viewModel/CommentsProvider';
// import ContentProvider, {ContentContext} from './_viewModel/ContentProvider';
// import EstimateDateProvider, {EstimateDateContext} from './_viewModel/EstimateDateProvider';
// import EstimateWorkTimeProvider, {EstimateWorkTimeContext} from './_viewModel/EstimateWorkTimeProvider';
// import LoaderProvider, {LoaderContext} from './_viewModel/LoaderProvider';
// import MomentousProvider, {MomentousContext} from './_viewModel/MomentousProvider';
// import PriorityProvider, {PriorityContext} from './_viewModel/PriorityProvider';
// import ProgressRateProvider, {ProgressRateContext} from './_viewModel/ProgressRateProvider';
// import RecordWorkTimeProvider, {RecordWorkTimeContext} from './_viewModel/RecordWorkTimeProvider';
// import SkillPointProvider, {SkillPointContext} from './_viewModel/SkillPointProvider';
// import StatusProvider, {StatusContext} from './_viewModel/StatusProvider';
// import StatusRibbonProvider, {StatusRibbonContext} from './_viewModel/StatusRibbonProvider';
// import TestDeviceProvider, {TestDeviceContext} from './_viewModel/TestDeviceProvider';
// import TitleProvider, {TitleContext} from './_viewModel/TitleProvider';


/**
 * 任務編輯光箱
 */
const TaskEditModal = createModal(
    () => {
        const {hide} = useModal();


        /**
         * Header
         */
        const renderHeader = () => {
            return <Flex className="flex-wrap gap-2">
                {/*<RepoGroup direction="column" className="mr-3" style={{width: '195px'}}>*/}
                {/*    <MemberTitle>*/}
                {/*        Deadline Date*/}
                {/*    </MemberTitle>*/}
                {/*    <FormControl>*/}
                {/*        <DeadlineDateEdit taskId={taskId}/>*/}
                {/*    </FormControl>*/}
                {/*</RepoGroup>*/}

                <FormControl data-label="Estimate Date" style={{minWidth: '195px'}}>
                    {renderEstimateDateEditor()}
                </FormControl>

                <FormControl data-label="Hour">
                    {renderEstimateWorkTimeEditor()}
                </FormControl>

                <FormControl data-label="Done">
                    <Skeleton w={100} h={25}/>
                </FormControl>

                <FormControl data-label="SkillPoint">
                    {renderSkillPointEditor()}
                </FormControl>

                <FormControl data-label="Priority">
                    {renderPriority()}
                </FormControl>


                <FormControl data-label="Category">
                    {renderCategory()}
                </FormControl>




            </Flex>;
        };



        const renderAttachedFiles = () => {

            return <Skeleton w={200} h={25}/>;
        };


        const renderCommentAdd = () => {
            return <Skeleton h={70}/>;
        };


        const renderComments = () => {
            return <Skeleton h={70}/>;
        };

        const renderAssignDeveloper = () => {
            return <Skeleton w={200} h={25}/>;

        };

        const renderAssignMerger = () => {
            return <Skeleton w={200} h={25}/>;

        };


        const renderAssignTester = () => {
            return <Skeleton w={200} h={25}/>;

        };


        const renderTestDevice = () => {
            return <Skeleton w={200} h={25}/>;

        };




        /**
         * 渲染主資料
         */
        const renderMainContent = () => {
            return <MainContent column className="gap-1">
                {/* 編輯 任務名稱 */}
                {renderTitleEditor()}

                {/* 內容編輯器 */}
                {renderContentEditor()}

                <FormControl data-label="Comments" className="mt-2">

                    {/* 新增留言 */}
                    {renderCommentAdd()}

                    {/* 留言紀錄 */}
                    {renderComments()}
                </FormControl>
            </MainContent>;
        };

        /**
         * Body/InfoContent
         */
        const renderInfoContent = () => {
            return <InfoContent className="g-1">

                <Col col={6} lg={12}>
                    <Flex className="gap-1 justify-content-between">

                        <FormControl data-label="Serial Number">
                            <Skeleton w={200} h={25}/>
                        </FormControl>


                    </Flex>
                </Col>



                <Col col={6} lg={12}>
                    <FormControl data-label="Repository">
                        <Flex className="flex-wrap">
                            <Skeleton w={200} h={25}/>
                        </Flex>
                    </FormControl>
                </Col>

                <Col col={6} lg={12}>
                    <Flex className="gap-1 justify-content-between">
                        <FormControl data-label="Version">
                            {renderReleaseVersion()}
                        </FormControl>

                    </Flex>
                </Col>
                <Col col={6} lg={12}>
                    <FormControl data-label="Developer">
                        {renderAssignDeveloper()}
                    </FormControl>
                </Col>
                <Col col={6} lg={12}>

                    <FormControl data-label="Merger">
                        {renderAssignMerger()}
                    </FormControl>
                </Col>
                <Col col={6} lg={12}>
                    <FormControl data-label="Tester">
                        {renderAssignTester()}
                    </FormControl>
                </Col>
                <Col col={6} lg={12}>
                    <FormControl data-label="Test Device">
                        {renderTestDevice()}
                    </FormControl>
                </Col>










                <FormControl data-label="Actions" className="d-none d-lg-flex">
                    <Flex column className="gap-1 mb-3">

                        <Skeleton w={200} h={25}/>
                        <Skeleton w={200} h={25}/>
                        <Skeleton w={200} h={25}/>
                        <Skeleton w={200} h={25}/>
                        <Skeleton w={200} h={25}/>

                    </Flex>

                    <Row className="gx-1">
                        <Col col="auto">
                            <Skeleton w={200} h={25}/>
                        </Col>

                        <Col col>
                            <Skeleton w={200} h={25}/>
                        </Col>

                    </Row>
                </FormControl>



            </InfoContent>;
        };


        // if(Current.isFetching){
        //     return <Loader/>;
        // }

        /**
         * 關閉光箱
         */
        const handleCloseModel = () => {
            // qc.invalidateQueries({queryKey: [EQueryKey.ProjectsTaskWithGanttQuery]})
            hide();
        };


        /**
         * 渲染編輯任務標題
         */
        const renderTitleEditor = () => {
            return <Skeleton  h={25}/>;

        };




        const renderProgressRate = () => {
            return <Skeleton w={200} h={25}/>;

        };



        const renderCategory = () => {
            return <Skeleton w={100} h={25}/>;

        };


        const renderPriority = () => {
            return <Skeleton w={100} h={25}/>;

        };


        /**
         * 渲染狀態
         */
        const renderStatus = () => {
            return <Skeleton w={200} h={25}/>;

        };

        /**
         * 渲染版本區塊
         */
        const renderReleaseVersion = () => {
            return <Skeleton w={200} h={25}/>;

        };


        const renderRecordWorkTime = () => {
            return <Skeleton w={200} h={25}/>;

        };

        /**
         * 渲染技術點數
         */
        const renderSkillPointEditor = () => {
            return <Skeleton w={80} h={25}/>;

        };

        const renderEstimateDateEditor = () => {
            return <Skeleton w={200} h={25}/>;

        };

        const renderEstimateWorkTimeEditor = () => {
            return <Skeleton w={80} h={25}/>;

        };

        /**
         * 渲染編輯內容標題
         */
        const renderContentEditor = () => {
            return <Skeleton h={350}/>;

        };






        /**
         * 渲染取消與完成 的右側標示條
         */
        const renderStatusRibbon = useCallback(() => {
            return <Skeleton w={200} h={25}/>;

        }, []);



        const renderLoader = () => {
            return <Skeleton w={200} h={25}/>;

        };



        return (
            <ModalLayout
                onCloseModal={handleCloseModel}
                size={{width: '900px'}}
            >


                {/* 滑入靠 PageRoot, 滑出靠 QueueFileUpload, 因為內容物件會影響滑出滑入*/}
                <PageRoot>
                    {/* Header */}
                    <Header>
                        {renderHeader()}
                    </Header>


                    <Container className="py-3" fluid>
                        <Row className="gy-3">
                            {/* MainContent */}
                            <Col col={12} lg className="order-2 order-lg-1">
                                {renderMainContent()}
                            </Col>

                            {/* InfoContent */}
                            <Col col={12} lg="auto" className="order-1 order-lg-2">
                                {renderInfoContent()}
                            </Col>


                        </Row>

                    </Container>
                </PageRoot>

            </ModalLayout>
        );
    },
    {
        variants: animation.fadeInDown,
        className: 'pb-4',
    }
);




export default TaskEditModal;









const InfoContent = styled(Row)`
  //position: relative;

    color: #eaeaea;
    font-size: 14px;

  ${media.lg`
      width: 245px;
  `}
`;

const MainContent = styled(Flex)`
    //flex: 1;
    //width: 0;
`;



const Header = styled.div`
    background-color: #343a40;
    padding: 15px 15px 7px 15px;
    position: relative;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
`;

const FormControl = styled(Flex)`
    flex-direction: column;
    gap: 2px;

    :before{
        content: attr(data-label);
        font-size: 12px;
        color: hsla(0,0%,100%,.5);
        text-transform: uppercase;
        padding-top: 4px;
        padding-bottom: 2px;
    }
`;


const PageRoot = styled.div`
  background: linear-gradient(to bottom,#272c31 80%,#151720 100%);
  min-height: 80vh;
  border-radius: 6px;
`;

