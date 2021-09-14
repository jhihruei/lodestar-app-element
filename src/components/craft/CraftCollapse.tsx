import { useEditor, useNode, UserComponent } from '@craftjs/core'
import { Button, Collapse, Form, Radio, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { v4 as uuid } from 'uuid'
import { useApp } from '../../contexts/AppContext'
import { useAuth } from '../../contexts/AuthContext'
import { handleError, uploadFile } from '../../helpers/index'
import { commonMessages, craftPageMessages } from '../../helpers/translation'
import { CraftMarginProps, CraftPaddingProps, CraftTextStyleProps } from '../../types/craft'
import Accordion from '../AccordionSingle'
import { AdminHeaderTitle, CraftRefBlock, StyledCollapsePanel, StyledSettingButtonWrapper } from '../common'
import ImageUploader from '../common/ImageUploader'
import CraftBoxModelInput, { formatBoxModelValue } from './CraftBoxModelInput'
import CraftColorPickerBlock from './CraftColorPickerBlock'
import CraftParagraphContentBlock from './CraftParagraphContentBlock'
import CraftTextStyleBlock from './CraftTextStyleBlock'
import CraftTitleContentBlock from './CraftTitleContentBlock'

type CraftCollapseProps = {
  title: string
  titleStyle: CraftTextStyleProps
  paragraph: string
  paragraphStyle: CraftTextStyleProps
  cardMargin: CraftMarginProps
  cardPadding: CraftPaddingProps
  variant: 'backgroundColor' | 'outline' | 'none'
  outlineColor?: string
  backgroundType?: 'none' | 'solidColor' | 'backgroundImage'
  solidColor?: string
  backgroundImageUrl?: string
}

type FieldProps = Pick<
  CraftCollapseProps,
  'title' | 'paragraph' | 'variant' | 'outlineColor' | 'backgroundType' | 'solidColor' | 'backgroundImageUrl'
> & {
  titleStyle: Pick<CraftTextStyleProps, 'fontSize' | 'textAlign' | 'fontWeight' | 'color'> & {
    margin: string
  }
  paragraphStyle: Pick<CraftTextStyleProps, 'fontSize' | 'lineHeight' | 'textAlign' | 'fontWeight' | 'color'> & {
    margin: string
  }
  cardMargin: string
  cardPadding: string
}

const CraftCollapse: UserComponent<CraftCollapseProps> = ({
  cardMargin,
  cardPadding,
  variant,
  outlineColor,
  backgroundType,
  solidColor,
  backgroundImageUrl,
  title,
  titleStyle,
  paragraph,
  paragraphStyle,
}) => {
  const { enabled } = useEditor(state => ({
    enabled: state.options.enabled,
  }))
  const {
    connectors: { connect, drag },
    selected,
  } = useNode(node => ({
    selected: node.events.selected,
  }))

  return (
    <CraftRefBlock ref={ref => ref && connect(drag(ref))} enabled={enabled} selected={selected}>
      <Accordion
        customStyle={{
          card: {
            bordered: variant === 'outline',
            shadow: false,
            borderColor: outlineColor,
            backgroundColor: variant !== 'none' && backgroundType === 'solidColor' ? solidColor : undefined,
            backgroundImage:
              variant !== 'none' && backgroundType === 'backgroundImage' ? backgroundImageUrl : undefined,
            ...cardMargin,
            ...cardPadding,
          },
          title: {
            textAlign: titleStyle.textAlign,
            fontSize: titleStyle.fontSize,
            fontWeight: titleStyle.fontWeight,
            color: titleStyle.color || '#585858',
            ...titleStyle.margin,
          },
          paragraph: {
            textAlign: paragraphStyle.textAlign,
            fontSize: paragraphStyle.fontSize,
            fontWeight: paragraphStyle.fontWeight,
            color: paragraphStyle.color || '#585858',
            lineHeight: paragraphStyle.lineHeight || 1.5,
            ...paragraphStyle.margin,
          },
        }}
        title={title}
        description={paragraph}
      />
    </CraftRefBlock>
  )
}

const CollapseSettings: React.VFC = () => {
  const { formatMessage } = useIntl()
  const [loading, setLoading] = useState(false)
  const { authToken } = useAuth()
  const { id: appId } = useApp()
  const [form] = useForm<FieldProps>()

  const {
    actions: { setProp },
    props,
    selected,
  } = useNode(node => ({
    props: node.data.props as CraftCollapseProps,
    selected: node.events.selected,
  }))
  const [isImageUploaded, setIsImageUploaded] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null)

  const handleChange = () => {
    form
      .validateFields()
      .then(values => {
        const cardMargin = formatBoxModelValue(values.cardMargin)
        const cardPadding = formatBoxModelValue(values.cardPadding)
        const titleMargin = formatBoxModelValue(values.titleStyle?.margin)
        const paragraphMargin = formatBoxModelValue(values.paragraphStyle?.margin)

        setProp(props => {
          props.cardMargin = {
            mt: cardMargin?.[0] || '0',
            mr: cardMargin?.[1] || '0',
            mb: cardMargin?.[2] || '0',
            ml: cardMargin?.[3] || '0',
          }
          props.cardPadding = {
            pt: cardPadding?.[0] || '0',
            pr: cardPadding?.[1] || '0',
            pb: cardPadding?.[2] || '0',
            pl: cardPadding?.[3] || '0',
          }
          props.variant = values.variant
          props.backgroundType = values.backgroundType
          props.outlineColor = values.outlineColor
          props.solidColor = values.solidColor
          props.title = values.title
          props.titleStyle.fontSize = values.titleStyle.fontSize
          props.titleStyle.margin = {
            mt: titleMargin?.[0] || '0',
            mr: titleMargin?.[1] || '0',
            mb: titleMargin?.[2] || '0',
            ml: titleMargin?.[3] || '0',
          }
          props.titleStyle.textAlign = values.titleStyle.textAlign
          props.titleStyle.fontWeight = values.titleStyle.fontWeight
          props.titleStyle.color = values.titleStyle.color
          props.paragraph = values.paragraph
          props.paragraphStyle.fontSize = values.paragraphStyle.fontSize
          props.paragraphStyle.lineHeight = values.paragraphStyle.lineHeight
          props.paragraphStyle.margin = {
            mt: paragraphMargin?.[0] || '0',
            mr: paragraphMargin?.[1] || '0',
            mb: paragraphMargin?.[2] || '0',
            ml: paragraphMargin?.[3] || '0',
          }
          props.paragraphStyle.textAlign = values.paragraphStyle.textAlign
          props.paragraphStyle.fontWeight = values.paragraphStyle.fontWeight
          props.paragraphStyle.color = values.paragraphStyle.color
        })
      })
      .catch(() => {})
  }

  const handleImageUpload = () => {
    if (backgroundImage) {
      const uniqId = uuid()
      setLoading(true)
      uploadFile(`images/${appId}/craft/${uniqId}`, backgroundImage, authToken)
        .then(() => {
          setProp(props => {
            props.backgroundImageUrl = `https://${process.env.REACT_APP_S3_BUCKET}/images/${appId}/craft/${uniqId}${
              backgroundImage.type.startsWith('image') ? '/1200' : ''
            }`
          })
          setIsImageUploaded(true)
        })
        .catch(handleError)
        .finally(() => setLoading(false))
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      colon={false}
      requiredMark={false}
      initialValues={{
        cardPadding: `${props.cardPadding?.pt || 0};${props.cardPadding?.pr || 0};${props.cardPadding?.pb || 0};${
          props.cardPadding?.pl || 0
        }`,
        cardMargin: `${props.cardMargin?.mt || 0};${props.cardMargin?.mr || 0};${props.cardMargin?.mb || 0};${
          props.cardMargin?.ml || 0
        }`,
        variant: props.variant || 'none',
        outlineColor: props.outlineColor || '#585858',
        backgroundType: props.backgroundType || 'none',
        solidColor: props.solidColor || '#cccccc',
        backgroundImage: props.backgroundImageUrl || '',
        title: props.title || '',
        titleStyle: {
          fontSize: props.titleStyle.fontSize || 16,
          margin: `${props.titleStyle.margin?.mt || 0};${props.titleStyle.margin?.mr || 0};${
            props.titleStyle.margin?.mb || 0
          };${props.titleStyle.margin?.ml || 0}`,
          textAlign: props.titleStyle.textAlign || 'left',
          fontWeight: props.titleStyle.fontWeight || 'normal',
          color: props.titleStyle.color || '#585858',
        },
        paragraph: props.paragraph || '',
        paragraphStyle: {
          fontSize: props.paragraphStyle.fontSize || 16,
          margin: `${props.paragraphStyle?.margin?.mt || 0};${props.paragraphStyle?.margin?.mr || 0};${
            props.paragraphStyle?.margin?.mb || 0
          };${props.paragraphStyle?.margin?.ml || 0}`,
          textAlign: props.paragraphStyle.textAlign || 'left',
          fontWeight: props.paragraphStyle.fontWeight || 'normal',
          color: props.paragraphStyle.color || '#585858',
        },
      }}
      onChange={handleChange}
    >
      <Form.Item name="title">
        <CraftTitleContentBlock />
      </Form.Item>
      <Form.Item name="titleStyle">
        <CraftTextStyleBlock type="title" title={formatMessage(craftPageMessages.label.titleStyle)} />
      </Form.Item>
      <Form.Item name="paragraph">
        <CraftParagraphContentBlock />
      </Form.Item>
      <Form.Item name="paragraphStyle">
        <CraftTextStyleBlock type="paragraph" title={formatMessage(craftPageMessages.label.paragraphStyle)} />
      </Form.Item>

      <Collapse className="mt-2 p-0" bordered={false} expandIconPosition="right" ghost defaultActiveKey={['cardStyle']}>
        <StyledCollapsePanel
          key="cardStyle"
          header={<AdminHeaderTitle>{formatMessage(craftPageMessages.label.cardStyle)}</AdminHeaderTitle>}
        >
          <Form.Item name="cardMargin" label={formatMessage(craftPageMessages.label.margin)}>
            <CraftBoxModelInput />
          </Form.Item>
          <Form.Item name="cardPadding" label={formatMessage(craftPageMessages.label.padding)}>
            <CraftBoxModelInput />
          </Form.Item>
        </StyledCollapsePanel>
      </Collapse>

      <Form.Item name="variant" label={formatMessage(craftPageMessages.label.variant)}>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="none">{formatMessage(craftPageMessages.label.none)}</Radio>
            <Radio value="outline">{formatMessage(craftPageMessages.label.outline)}</Radio>
            <Radio value="backgroundColor">{formatMessage(craftPageMessages.label.backgroundColor)}</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      {props.variant === 'outline' && (
        <Form.Item name="outlineColor">
          <CraftColorPickerBlock />
        </Form.Item>
      )}

      {props.variant === 'backgroundColor' && (
        <Form.Item name="backgroundType" label={formatMessage(craftPageMessages.label.background)}>
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="none">{formatMessage(craftPageMessages.ui.empty)}</Radio.Button>
            <Radio.Button value="solidColor">{formatMessage(craftPageMessages.ui.solidColor)}</Radio.Button>
            <Radio.Button value="backgroundImage">{formatMessage(craftPageMessages.ui.image)}</Radio.Button>
          </Radio.Group>
        </Form.Item>
      )}

      {props.variant === 'backgroundColor' && props.backgroundType === 'solidColor' && (
        <Form.Item name="solidColor">
          <CraftColorPickerBlock />
        </Form.Item>
      )}

      {props.variant === 'backgroundColor' && props.backgroundType === 'backgroundImage' && (
        <Form.Item name="backgroundImage">
          <ImageUploader
            file={backgroundImage}
            initialCoverUrl={props.backgroundImageUrl}
            onChange={file => {
              setIsImageUploaded(false)
              setBackgroundImage(file)
            }}
          />
        </Form.Item>
      )}
      {selected && backgroundImage && !isImageUploaded && (
        <StyledSettingButtonWrapper>
          <Button loading={loading} className="mb-3" type="primary" block onClick={handleImageUpload}>
            {formatMessage(commonMessages.ui.save)}
          </Button>
        </StyledSettingButtonWrapper>
      )}
    </Form>
  )
}

CraftCollapse.craft = {
  related: {
    settings: CollapseSettings,
  },
  custom: {
    button: {
      label: 'deleteBlock',
    },
  },
}

export default CraftCollapse
