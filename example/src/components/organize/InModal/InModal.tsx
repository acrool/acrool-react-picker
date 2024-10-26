import {Col, Container, Flex, media, Row} from '@acrool/react-grid';
import {animation, createStateModal, useModal} from '@acrool/react-modal';
import {Skeleton} from '@acrool/react-skeleton';
import React from 'react';
import styled from 'styled-components';

import {optionsSmall} from '../../../config/data';
import DateField from '../../examples/DateField';
import Select2 from '../../examples/Select2';
import ModalLayout from './ModalLayout';


/**
 * 任務編輯光箱
 */
const InModal = () => {
    const {hide} = useModal();

    /**
         * Header
         */
    const renderHeader = () => {
        return <Flex className="flex-wrap gap-2">
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



    const renderCommentAdd = () => {
        return <Skeleton h={70}/>;
    };


    const renderComments = () => {
        return <Skeleton h={70}/>;
    };

    const renderAssignDeveloper = () => {
        return <Select2
            value="1"
            isSearchEnable
            options={optionsSmall}
            onChange={() => {}}
        />;

    };

    const renderAssignMerger = () => {
        return <Select2
            value="2"
            options={optionsSmall}
            onChange={() => {}}
        />;

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

                    <Skeleton w={200} h={45}/>
                    <Skeleton w={200} h={45}/>
                    <Skeleton w={200} h={45}/>

                </Flex>

                <Row className="gx-1">
                    <Col col="auto">
                        <Skeleton w={130} h={45}/>
                    </Col>

                    <Col col>
                        <Skeleton w={70} h={45}/>
                    </Col>

                </Row>
            </FormControl>



        </InfoContent>;
    };


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


    const renderCategory = () => {
        return <Skeleton w={100} h={25}/>;

    };


    const renderPriority = () => {
        return <Skeleton w={100} h={25}/>;

    };


    /**
         * 渲染版本區塊
         */
    const renderReleaseVersion = () => {
        return <Skeleton w={200} h={25}/>;

    };

    /**
         * 渲染技術點數
         */
    const renderSkillPointEditor = () => {
        return <Skeleton w={80} h={25}/>;

    };

    const renderEstimateDateEditor = () => {
        return <DateField/>;

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




    return (
        <ModalLayout
            onCloseModal={handleCloseModel}
            size={{width: '900px'}}
            name="TaskEditModal"
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
};


export default createStateModal(
    InModal,
    {
        ...animation.generateFadeIn(),
        className: 'pb-4',
    },
)









const InfoContent = styled(Row)`
    color: #eaeaea;
    font-size: 14px;

  ${media.lg`
      width: 245px;
  `}
`;

const MainContent = styled(Flex)`
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

