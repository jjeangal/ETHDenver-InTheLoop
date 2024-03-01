'use client'

import {
    Flex,
    Input,
    Grid,
    Button,
    FormControl,
    FormLabel,
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionButton,
    AccordionPanel,
    Switch,
    Box
} from "@chakra-ui/react";
import { useState } from "react";
import { licensingModuleAbi, useRegisterPILPolicy } from "@story-protocol/react";
import { PolicyParameters, RegistrationParams } from "../services/interfaces";
import { zeroAddress } from 'viem';
import { useWatchContractEvent } from "wagmi";

export default function AddPolicy() {

    const [policyParams, setpolicyParams] = useState<PolicyParameters>({
        attribution: true,
        commercialUse: false,
        commercialAttribution: false,
        commercializerChecker: zeroAddress,
        commercializerCheckerData: '0x',
        commercialRevShare: 0,
        derivativesAllowed: true,
        derivativesAttribution: true,
        derivativesApproval: false,
        derivativesReciprocal: false,
        territories: ['USA', 'CANADA'],
        distributionChannels: [],
        contentRestrictions: [],
    });

    //NEED TO SET ROYALTY ATTRIBUTION

    const [regParams, setRegParams] = useState<RegistrationParams>({
        transferable: true, // Whether or not attribution is required when reproducing the work
        royaltyPolicy: zeroAddress, // Address of a royalty policy contract that will handle royalty payments
        mintingFee: BigInt(0),
        mintingFeeToken: zeroAddress,
        policy: policyParams,
    });


    useWatchContractEvent({
        address: '0x950d766A1a0afDc33c3e653C861A8765cb42DbdC',
        abi: licensingModuleAbi,
        eventName: 'PolicyRegistered',
        onLogs(logs) {
            console.log(logs);
        }
    });

    const {
        writeContractAsync,
        isPending,
        data: txHash,
    } = useRegisterPILPolicy();

    async function handleClick() {
        console.log(policyParams);
        await writeContractAsync({
            functionName: 'registerPolicy',
            args: [regParams],
        });
        if (txHash == undefined) {
            console.log('Transaction failed: Policy already exists or invalid parameters.')
            return;
        };
        console.log(txHash);
    };

    return (
        <Flex direction="column" alignItems="center">
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Policy Form
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Box as="form" id='my-form'>
                            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                <FormControl display='flex' alignItems='center'>
                                    <FormLabel htmlFor='transferable' mb='0'>Transferable</FormLabel>
                                    <Switch id='transferable' onChange={(e) => setRegParams(prevState => ({ ...prevState, transferable: e.target.checked }))} defaultChecked={regParams.transferable} />
                                </FormControl>

                                <FormControl display='flex' alignItems='center'>
                                    <FormLabel htmlFor='attribution' mb='0'>Attribution</FormLabel>
                                    <Switch id='attribution' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, attribution: e.target.checked }))} defaultChecked={policyParams.attribution} />
                                </FormControl>

                                <FormControl display='flex' alignItems='center'>
                                    <FormLabel htmlFor='commercialUse' mb='0'>Commercial Use</FormLabel>
                                    <Switch id='commercialUse' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, commercialUse: e.target.checked }))} defaultChecked={policyParams.commercialUse} />
                                </FormControl>

                                <FormControl display='flex' alignItems='center'>
                                    <FormLabel htmlFor='commercialAttribution' mb='0'>Commercial Attribution</FormLabel>
                                    <Switch id='commercialAttribution' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, commercialAttribution: e.target.checked }))} defaultChecked={policyParams.commercialAttribution} />
                                </FormControl>

                                <FormControl display='flex' alignItems='center'>
                                    <FormLabel htmlFor='derivativesAllowed' mb='0'>Derivatives Allowed</FormLabel>
                                    <Switch id='derivativesAllowed' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, derivativesAllowed: e.target.checked }))} defaultChecked={policyParams.derivativesAllowed} />
                                </FormControl>

                                <FormControl display='flex' alignItems='center'>
                                    <FormLabel htmlFor='derivativesAttribution' mb='0'>Derivatives Attribution</FormLabel>
                                    <Switch id='derivativesAttribution' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, derivativesAttribution: e.target.checked }))} defaultChecked={policyParams.derivativesAttribution} />
                                </FormControl>

                                <FormControl display='flex' alignItems='center'>
                                    <FormLabel htmlFor='derivativesApproval' mb='0'>Derivatives Approval</FormLabel>
                                    <Switch id='derivativesApproval' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, derivativesApproval: e.target.checked }))} defaultChecked={policyParams.derivativesApproval} />
                                </FormControl>

                                <FormControl display='flex' alignItems='center'>
                                    <FormLabel htmlFor='derivativesReciprocal' mb='0'>Derivatives Reciprocal</FormLabel>
                                    <Switch id='derivativesReciprocal' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, derivativesReciprocal: e.target.checked }))} defaultChecked={policyParams.derivativesReciprocal} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor='commercializerChecker'>Commercializer Checker</FormLabel>
                                    <Input id='commercializerChecker' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, commercializerChecker: e.target.value }))} defaultValue={policyParams.commercializerChecker} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor='commercializerCheckerData'>Commercializer Checker Data</FormLabel>
                                    <Input id='commercializerCheckerData' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, commercializerCheckerData: e.target.value }))} defaultValue={policyParams.commercializerCheckerData} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor='commercialRevShare'>Commercial Rev Share</FormLabel>
                                    <Input id='commercialRevShare' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, commercialRevShare: parseInt(e.target.value) }))} defaultValue={policyParams.commercialRevShare} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor='territories'>Territories</FormLabel>
                                    <Input id='territories' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, territories: e.target.value.split(',') }))} defaultValue={policyParams.territories.join(',')} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor='distributionChannels'>Distribution Channels</FormLabel>
                                    <Input id='distributionChannels' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, distributionChannels: e.target.value.split(',') }))} defaultValue={policyParams.distributionChannels.join(',')} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor='contentRestrictions'>Content Restrictions</FormLabel>
                                    <Input id='contentRestrictions' onChange={(e) => setpolicyParams(prevState => ({ ...prevState, contentRestrictions: e.target.value.split(',') }))} defaultValue={policyParams.contentRestrictions.join(',')} />
                                </FormControl>
                            </Grid>

                            <Button disabled={isPending} onClick={() => handleClick()} mt={4}>
                                {isPending ? 'Confirm in wallet' : 'Register PIL Policy'}
                            </Button>
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    )
}