'use client'

import {
    Flex,
    useDisclosure,
    Input,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    FormControl,
    FormLabel,
    Switch
} from "@chakra-ui/react"

const policyParameters = {
    attribution: true,
    commercialUse: false,
    commercialAttribution: false,
    commercializerChecker: '0x' as `0x${string}`,
    commercializerCheckerData: '0x' as `0x${string}`,
    commercialRevShare: 0,
    derivativesAllowed: true,
    derivativesAttribution: true,
    derivativesApproval: false,
    derivativesReciprocal: false,
    territories: ['USA', 'CANADA'],
    distributionChannels: [],
    contentRestrictions: [],
};

export default function AddPolicy() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex>
            <Button onClick={onOpen}>New Policy</Button>
            <Drawer isOpen={isOpen} onClose={onClose} size="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create a Policy</DrawerHeader>
                    <DrawerBody>
                        <form
                            id='my-form'
                            onSubmit={(e) => {
                                e.preventDefault()
                                console.log('submitted')
                            }}
                        >
                            {Object.keys(policyParameters).map((key) => (
                                typeof policyParameters[key as keyof typeof policyParameters] === 'boolean' ? (
                                    <FormControl display='flex' alignItems='center' key={key}>
                                        <FormLabel htmlFor={key} mb='0'>
                                            {key}
                                        </FormLabel>
                                        <Switch id={key} defaultChecked={Boolean(policyParameters[key as keyof typeof policyParameters])} />
                                    </FormControl>
                                ) : (
                                    <FormControl key={key}>
                                        <FormLabel htmlFor={key}>{key}</FormLabel>
                                        <Input id={key} defaultValue={policyParameters[key as keyof typeof policyParameters] as string} />
                                    </FormControl>
                                )
                            ))}
                        </form>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button type='submit' form='my-form'>
                            Create
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}